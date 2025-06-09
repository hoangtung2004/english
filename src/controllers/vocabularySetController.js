const VocabularySet = require('../models/VocabularySet');

// Hiển thị danh sách cho user
exports.list = async (req, res) => {
    const sets = await VocabularySet.find().sort({ createdAt: 1 });
    res.render('vocabulary-sets/index', { title: 'Bộ từ vựng', sets });
};

// Trang quản lý cho admin
exports.adminList = async (req, res) => {
    const sets = await VocabularySet.find().sort({ createdAt: 1 });
    res.render('admin/vocabulary-sets/list', { title: 'Quản lý bộ từ vựng', sets });
};

// Form thêm
exports.getCreate = (req, res) => {
    res.render('admin/vocabulary-sets/create', { title: 'Thêm bộ từ vựng', error: null });
};

// Xử lý thêm
exports.postCreate = async (req, res) => {
    try {
        const { name, description, icon, color, status } = req.body;
        await VocabularySet.create({ name, description, icon, color, status });
        res.redirect('/admin/vocabulary-sets');
    } catch (error) {
        res.render('admin/vocabulary-sets/create', { title: 'Thêm bộ từ vựng', error: 'Lỗi khi thêm bộ từ vựng' });
    }
};

// Form sửa
exports.getEdit = async (req, res) => {
    const set = await VocabularySet.findById(req.params.id);
    res.render('admin/vocabulary-sets/edit', { title: 'Sửa bộ từ vựng', set, error: null });
};

// Xử lý sửa
exports.postEdit = async (req, res) => {
    try {
        const { name, description, icon, color, status } = req.body;
        await VocabularySet.findByIdAndUpdate(req.params.id, { name, description, icon, color, status });
        res.redirect('/admin/vocabulary-sets');
    } catch (error) {
        const set = await VocabularySet.findById(req.params.id);
        res.render('admin/vocabulary-sets/edit', { title: 'Sửa bộ từ vựng', set, error: 'Lỗi khi sửa bộ từ vựng' });
    }
};

// Xóa
exports.delete = async (req, res) => {
    await VocabularySet.findByIdAndDelete(req.params.id);
    res.redirect('/admin/vocabulary-sets');
}; 