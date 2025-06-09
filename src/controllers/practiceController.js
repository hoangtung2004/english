const UserVocabularyProgress = require('../models/UserVocabularyProgress');
const Vocabulary = require('../models/Vocabulary');

exports.getPractice = (req, res) => {
    if (!req.session.user) {
        return res.render('practice/index', {
            title: 'Luyện tập',
            message: 'Vui lòng đăng nhập để luyện tập.'
        });
    }
    // Nếu user chưa học gì (chưa có learningProgress hoặc mảng rỗng)
    const user = req.session.userData || req.session.user;
    if (!user.learningProgress || user.learningProgress.length === 0) {
        return res.render('practice/index', {
            title: 'Luyện tập',
            message: 'Hãy học bài mới hoặc từ mới trước khi luyện tập!'
        });
    }
    // Nếu có dữ liệu học, sau này sẽ hiển thị bài luyện tập
    res.render('practice/index', {
        title: 'Luyện tập',
        message: null
    });
};

// API trả về danh sách từ cần ôn tập cho user
exports.getPracticeData = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Chưa đăng nhập' });
        }
        const userId = req.session.user._id;
        // Lấy các từ cần ôn tập (nextReviewDate <= hôm nay)
        const now = new Date();
        const progresses = await UserVocabularyProgress.find({
            user: userId,
            nextReviewDate: { $lte: now }
        }).populate('vocabulary');
        // Trả về dữ liệu cần thiết cho luyện tập
        const data = progresses.map(p => ({
            id: p._id,
            word: p.vocabulary.word,
            pron: p.vocabulary.pronunciation,
            meaning: p.vocabulary.meaning,
            example: p.vocabulary.example,
            audio: p.vocabulary.audio || '',
            image: p.vocabulary.image || '',
            level: p.level
        }));
        res.json({ success: true, words: data });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// API cập nhật kết quả luyện tập cho từng từ
exports.updatePracticeProgress = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Chưa đăng nhập' });
        }
        const userId = req.session.user._id;
        const { id, result } = req.body; // id: progressId, result: 'correct' | 'wrong'
        const progress = await UserVocabularyProgress.findOne({ _id: id, user: userId });
        if (!progress) return res.status(404).json({ error: 'Không tìm thấy tiến độ từ vựng' });
        // Cập nhật level và ngày ôn tiếp theo
        let level = progress.level;
        if (result === 'correct') {
            level = Math.min(level + 1, 5);
        } else {
            level = 1;
        }
        // Tính ngày ôn tiếp theo
        const now = new Date();
        let nextReviewDate = new Date(now);
        if (level === 1) nextReviewDate.setDate(now.getDate() + 1);
        else if (level === 2) nextReviewDate.setDate(now.getDate() + 2);
        else if (level === 3) nextReviewDate.setDate(now.getDate() + 4);
        else if (level === 4) nextReviewDate.setDate(now.getDate() + 7);
        else if (level === 5) nextReviewDate.setDate(now.getDate() + 30);
        // Cập nhật lịch sử
        progress.level = level;
        progress.nextReviewDate = nextReviewDate;
        if (result === 'correct') progress.correctCount++;
        else progress.wrongCount++;
        progress.history.push({ date: now, result });
        await progress.save();
        res.json({ success: true, level, nextReviewDate });
    } catch (err) {
        res.status(500).json({ error: 'Lỗi server' });
    }
};

// API trả về số lượng từ ở từng cấp độ cho user
exports.getLevelStats = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ error: 'Chưa đăng nhập' });
        }
        const userId = req.session.user._id;
        const mongoose = require('mongoose');
        let userObjId;
        if (mongoose.Types.ObjectId.isValid(userId)) {
            userObjId = new mongoose.Types.ObjectId(userId);
        } else {
            return res.status(400).json({ error: 'UserId không hợp lệ' });
        }
        const stats = await UserVocabularyProgress.aggregate([
            { $match: { user: userObjId } },
            { $group: { _id: '$level', count: { $sum: 1 } } }
        ]);
        // Đưa về dạng [level1, level2, ... level5]
        const result = [0,0,0,0,0];
        stats.forEach(s => {
            if (s._id >= 1 && s._id <= 5) result[s._id-1] = s.count;
        });
        res.json({ success: true, levels: result });
    } catch (err) {
        console.error('Lỗi level-stats:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
}; 