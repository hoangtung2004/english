const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toeicQuestionSchema = new Schema({
  part: { type: Number, required: true }, // 1-7
  number: { type: Number, required: true }, // Question number (1-200)
  content: { type: String }, // Nội dung câu hỏi hoặc chỉ dẫn
  choices: [{ label: String, text: String }], // A/B/C/D
  correctAnswer: { type: String, required: true }, // 'A', 'B', 'C', 'D'
  audioUrl: { type: String }, // Cho Part 1-4 nếu có audio
  imageUrl: { type: String }, // Cho Part 1 nếu có hình ảnh
  groupId: { type: String }, // Cho các câu thuộc cùng 1 đoạn hội thoại/đoạn văn
  passage: { type: String }, // Cho Part 6, 7 (đoạn văn)
  explain: { type: String } // Giải thích đáp án (nếu có)
});

module.exports = mongoose.model('ToeicQuestion', toeicQuestionSchema); 