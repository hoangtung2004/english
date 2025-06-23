const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'ToeicQuestion', required: true },
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const toeicResultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: Schema.Types.ObjectId, ref: 'ToeicTest', required: true },
  answers: [answerSchema],
  score: { type: Number, required: true },
  startedAt: { type: Date, required: true },
  finishedAt: { type: Date, required: true }
});

module.exports = mongoose.model('ToeicResult', toeicResultSchema); 