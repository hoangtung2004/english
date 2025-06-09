const mongoose = require('mongoose');

const vocabularySetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '' }, // icon dạng emoji hoặc url
    color: { type: String, default: '#f7c948' }, // màu nền card
    status: { type: String, enum: ['active', 'inactive', 'start'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VocabularySet', vocabularySetSchema); 