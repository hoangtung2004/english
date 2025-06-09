const mongoose = require('mongoose');
const VocabularySet = require('../models/VocabularySet');
const VocabularyLesson = require('../models/VocabularyLesson');

mongoose.connect('mongodb://localhost:27017/english-learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seed() {
  const set = await VocabularySet.findOne({ name: '1000 Từ Cơ Bản' });
  if (!set) {
    console.log('Không tìm thấy bộ từ vựng 1000 Từ Cơ Bản');
    return mongoose.disconnect();
  }
  const lessons = [
    {
      name: 'Schools',
      description: '1. Trường học',
      image: 'https://img.freepik.com/free-photo/group-young-students-are-discussing-their-project_1150-11014.jpg',
      order: 1,
      set: set._id
    },
    {
      name: 'Examination',
      description: '2. Kì thi',
      image: 'https://img.freepik.com/free-photo/open-book-with-heart-shape-pages_1150-11012.jpg',
      order: 2,
      set: set._id
    },
    {
      name: 'Extracurricular Activities',
      description: '3. Hoạt động ngoại khóa',
      image: 'https://img.freepik.com/free-photo/park-with-trees-benches_1150-11013.jpg',
      order: 3,
      set: set._id
    }
  ];
  await VocabularyLesson.insertMany(lessons);
  console.log('Đã thêm dữ liệu mẫu bài nhỏ cho bộ 1000 Từ Cơ Bản!');
  mongoose.disconnect();
}

seed(); 