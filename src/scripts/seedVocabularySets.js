const mongoose = require('mongoose');
const VocabularySet = require('../models/VocabularySet');

mongoose.connect('mongodb://localhost:27017/english-learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sets = [
  {
    name: '1000 Từ Cơ Bản',
    description: 'Củng cố nền tảng tiếng Anh. Từ vựng nền tảng.',
    icon: '🎯 🎓',
    color: '#f7c948',
    status: 'start'
  },
  {
    name: 'IELTS Cơ Bản',
    description: 'Ôn IELTS 6.5 Reading & Listening. Hơn 1200 từ IELTS.',
    icon: '🎯 🎓',
    color: '#f6f6f6',
    status: 'active'
  },
  {
    name: 'TOEIC Cơ Bản',
    description: 'Từ vựng nền tảng cho TOEIC. Luyện thi TOEIC hiệu quả.',
    icon: '📚 🎓',
    color: '#e0e7ff',
    status: 'active'
  }
];

VocabularySet.insertMany(sets)
  .then(() => {
    console.log('Đã thêm dữ liệu mẫu bộ từ vựng!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  }); 