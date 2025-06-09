const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    meaning: {
        type: String,
        required: true
    },
    pronunciation: {
        type: String,
        required: true
    },
    example: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ['basic', 'intermediate', 'advanced']
    },
    topic: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VocabularyLesson',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vocabulary', vocabularySchema); 