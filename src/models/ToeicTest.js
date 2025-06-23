const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toeicTestSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, default: 120 * 60 }, // 120 phút
  parts: [
    {
      partNumber: { type: Number, required: true }, // 1-7
      name: { type: String, required: true }, // Tên phần
      description: { type: String }, // Mô tả phần
      audioUrl: { type: String }, // Thêm trường âm thanh cho cả phần
      questions: [{ type: Schema.Types.ObjectId, ref: 'ToeicQuestion' }]
    }
  ]
});

module.exports = mongoose.model('ToeicTest', toeicTestSchema); 