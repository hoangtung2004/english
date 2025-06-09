const IrregularVerb = require('../models/IrregularVerb');

exports.getIrregularVerbs = async (req, res) => {
    try {
        const verbs = await IrregularVerb.find().sort({ v1: 1 });
        res.render('irregular-verbs/index', {
            title: 'Động từ bất quy tắc',
            verbs
        });
    } catch (error) {
        res.status(500).render('error', {
            message: 'Lỗi khi tải danh sách động từ bất quy tắc',
            error
        });
    }
}; 