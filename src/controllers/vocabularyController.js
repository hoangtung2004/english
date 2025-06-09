const Vocabulary = require('../models/Vocabulary');
const VocabularySet = require('../models/VocabularySet');
const VocabularyLesson = require('../models/VocabularyLesson');
const User = require('../models/User');
const UserVocabularyProgress = require('../models/UserVocabularyProgress');

// Lấy danh sách từ vựng theo chủ đề và trình độ
exports.getVocabularies = async (req, res) => {
    try {
        const { topic, category, page = 1, limit = 20 } = req.query;
        const query = {};
        
        if (topic) query.topic = topic;
        if (category) query.category = category;

        const vocabularies = await Vocabulary.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ difficulty: 1 });

        const total = await Vocabulary.countDocuments(query);

        res.render('vocabulary/index', {
            title: 'Học từ vựng',
            vocabularies,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            topic,
            category,
            user: req.session.user || null
        });
    } catch (error) {
        console.error('Error in getVocabularies:', error);
        res.status(500).render('error', {
            message: 'Lỗi khi tải danh sách từ vựng',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// Hiển thị form tạo từ vựng mới
exports.getCreateVocabulary = (req, res) => {
    res.render('vocabulary/create', {
        title: 'Thêm từ vựng mới',
        user: req.session.user || null
    });
};

// Tạo từ vựng mới
exports.createVocabulary = async (req, res) => {
    try {
        const { word, pronunciation, meaning, example, category, topic, difficulty } = req.body;
        
        // Validation
        if (!word || !pronunciation || !meaning || !example || !category || !topic || !difficulty) {
            return res.status(400).render('vocabulary/create', {
                title: 'Thêm từ vựng mới',
                error: 'Vui lòng điền đầy đủ thông tin',
                user: req.session.user || null
            });
        }

        // Kiểm tra từ vựng đã tồn tại
        const existingVocabulary = await Vocabulary.findOne({ word: word.toLowerCase() });
        if (existingVocabulary) {
            return res.status(400).render('vocabulary/create', {
                title: 'Thêm từ vựng mới',
                error: 'Từ vựng này đã tồn tại',
                user: req.session.user || null
            });
        }

        const vocabulary = new Vocabulary({
            word: word.toLowerCase(),
            pronunciation,
            meaning,
            example,
            category,
            topic,
            difficulty: parseInt(difficulty),
            image: req.file ? `/uploads/${req.file.filename}` : null
        });

        await vocabulary.save();
        res.redirect('/vocabulary');
    } catch (error) {
        console.error('Error in createVocabulary:', error);
        res.status(400).render('vocabulary/create', {
            title: 'Thêm từ vựng mới',
            error: 'Lỗi khi tạo từ vựng mới',
            user: req.session.user || null
        });
    }
};

// Xem chi tiết từ vựng
exports.getVocabulary = async (req, res) => {
    try {
        const vocabulary = await Vocabulary.findById(req.params.id);
        if (!vocabulary) {
            return res.status(404).render('error', {
                message: 'Không tìm thấy từ vựng',
                error: {}
            });
        }
        let userProgress = null;
        if (req.session.user) {
            const userId = req.session.user._id;
            // Thêm tiến độ nếu chưa có
            await UserVocabularyProgress.findOneAndUpdate(
                { user: userId, vocabulary: vocabulary._id },
                { $setOnInsert: { level: 1, nextReviewDate: new Date() } },
                { upsert: true, new: true }
            );
            // Lấy tiến độ
            userProgress = await UserVocabularyProgress.findOne({ user: userId, vocabulary: vocabulary._id });
        }
        res.render('vocabulary/show', {
            title: vocabulary.word,
            vocabulary,
            userProgress,
            user: req.session.user || null
        });
    } catch (error) {
        console.error('Error in getVocabulary:', error);
        res.status(500).render('error', {
            message: 'Lỗi khi tải thông tin từ vựng',
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// Cập nhật tiến độ học từ vựng
exports.updateLearningProgress = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ success: false, error: 'Vui lòng đăng nhập' });
        }

        const { vocabularyId } = req.params;
        const { status } = req.body;

        if (!['not_learned', 'learning', 'mastered'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Trạng thái không hợp lệ' });
        }

        const vocabulary = await Vocabulary.findById(vocabularyId);
        if (!vocabulary) {
            return res.status(404).json({ success: false, error: 'Không tìm thấy từ vựng' });
        }

        const user = await User.findById(req.session.user._id);
        const progressIndex = user.learningProgress.findIndex(
            progress => progress.vocabulary.toString() === vocabularyId
        );

        if (progressIndex === -1) {
            // Thêm từ vựng mới vào tiến độ học
            user.learningProgress.push({
                vocabulary: vocabularyId,
                status,
                lastReview: new Date(),
                nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 giờ sau
            });
        } else {
            // Cập nhật trạng thái học
            user.learningProgress[progressIndex].status = status;
            user.learningProgress[progressIndex].lastReview = new Date();
            user.learningProgress[progressIndex].reviewCount += 1;
            
            // Tính toán thời gian ôn tập tiếp theo dựa trên số lần ôn tập
            const reviewCount = user.learningProgress[progressIndex].reviewCount;
            const nextReviewDelay = Math.pow(2, reviewCount) * 24 * 60 * 60 * 1000; // Tăng thời gian ôn tập theo cấp số nhân
            user.learningProgress[progressIndex].nextReview = new Date(Date.now() + nextReviewDelay);
        }

        await user.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error in updateLearningProgress:', error);
        res.status(500).json({ success: false, error: 'Lỗi server' });
    }
};

// Hiển thị danh sách bộ từ vựng
exports.getVocabularySets = async (req, res) => {
    const sets = await VocabularySet.find().sort({ createdAt: 1 });
    res.render('vocabulary/sets', { title: 'Chọn bộ từ vựng', sets });
};

// Hiển thị danh sách bài nhỏ trong bộ
exports.getLessonsBySet = async (req, res) => {
    const set = await VocabularySet.findById(req.params.id);
    if (!set) return res.status(404).render('error', { message: 'Không tìm thấy bộ từ vựng', error: {} });
    const lessons = await VocabularyLesson.find({ set: set._id }).sort({ order: 1 });
    res.render('vocabulary/lessons', {
        title: `Các chủ đề - ${set.name}`,
        set,
        lessons
    });
};

// Hiển thị từ vựng của một bài nhỏ
exports.getVocabularyByLesson = async (req, res) => {
    res.redirect(`/vocabulary/lesson/${req.params.lessonId}/flashcard`);
};

// Học từ vựng theo flashcard
exports.getFlashcardLesson = async (req, res) => {
    const lesson = await VocabularyLesson.findById(req.params.lessonId).populate('set');
    if (!lesson) return res.status(404).render('error', { message: 'Không tìm thấy bài học', error: {} });
    const vocabularies = await Vocabulary.find({ lesson: lesson._id });
    let index = parseInt(req.query.index) || 0;
    if (index < 0) index = 0;
    if (index >= vocabularies.length) index = vocabularies.length - 1;
    // Thêm tiến độ cho tất cả từ trong bài nếu chưa có
    if (req.session.user) {
        const userId = req.session.user._id;
        console.log('User ID:', userId, 'Số từ:', vocabularies.length);
        try {
            await Promise.all(vocabularies.map(vocab =>
                UserVocabularyProgress.findOneAndUpdate(
                    { user: userId, vocabulary: vocab._id },
                    { $setOnInsert: { level: 1, nextReviewDate: new Date() } },
                    { upsert: true, new: true }
                )
            ));
            console.log('Đã thêm tiến độ cho các từ');
        } catch (e) {
            console.error('Lỗi khi thêm tiến độ:', e);
        }
    }
    res.render('vocabulary/flashcard', {
        title: `Flashcard - ${lesson.name}`,
        lesson,
        vocabularies,
        index,
        user: req.session.user || null
    });
}; 