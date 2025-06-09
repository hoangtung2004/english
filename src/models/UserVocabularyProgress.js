const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserVocabularyProgressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vocabulary: { type: Schema.Types.ObjectId, ref: 'Vocabulary', required: true },
  level: { type: Number, default: 1 }, // 1-5
  nextReviewDate: { type: Date, default: Date.now },
  correctCount: { type: Number, default: 0 },
  wrongCount: { type: Number, default: 0 },
  history: [
    {
      date: Date,
      result: String // 'correct' | 'wrong'
    }
  ]
});

UserVocabularyProgressSchema.index({ user: 1, vocabulary: 1 }, { unique: true });

module.exports = mongoose.model('UserVocabularyProgress', UserVocabularyProgressSchema); 