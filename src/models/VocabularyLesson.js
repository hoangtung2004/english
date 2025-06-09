const mongoose = require('mongoose');

const vocabularyLessonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    order: { type: Number, default: 0 },
    set: { type: mongoose.Schema.Types.ObjectId, ref: 'VocabularySet', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VocabularyLesson', vocabularyLessonSchema); 