const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    vocabulary: [{
        word: String,
        meaning: String,
        example: String
    }],
    exercises: [{
        question: String,
        options: [String],
        correctAnswer: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lesson', lessonSchema); 