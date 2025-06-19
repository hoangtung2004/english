const Lesson = require('../models/Lesson');

// Lấy danh sách bài học
exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().sort({ createdAt: -1 });
        res.render('lessons/index', { 
            title: 'Danh sách bài học',
            lessons,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).render('error', { 
            message: 'Lỗi khi tải danh sách bài học',
            error 
        });
    }
};

// Hiển thị form tạo bài học mới
exports.getCreateLesson = (req, res) => {
    res.render('lessons/create', { 
        title: 'Tạo bài học mới'
    });
};

// Tạo bài học mới
exports.createLesson = async (req, res) => {
    try {
        const lesson = new Lesson(req.body);
        await lesson.save();
        res.redirect('/lessons');
    } catch (error) {
        res.status(400).render('lessons/create', {
            title: 'Tạo bài học mới',
            error: 'Lỗi khi tạo bài học'
        });
    }
};

// Xem chi tiết bài học
exports.getLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).render('error', {
                message: 'Không tìm thấy bài học'
            });
        }
        res.render('lessons/show', {
            title: lesson.title,
            lesson
        });
    } catch (error) {
        res.status(500).render('error', {
            message: 'Lỗi khi tải bài học',
            error
        });
    }
}; 