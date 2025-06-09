const mongoose = require('mongoose');
const Vocabulary = require('../models/Vocabulary');
const VocabularyLesson = require('../models/VocabularyLesson');

mongoose.connect('mongodb://localhost:27017/english-learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seed() {
  // Lấy bài nhỏ đầu tiên trong bộ "1000 Từ Cơ Bản"
  const lesson = await VocabularyLesson.findOne({ name: 'Schools' });
  if (!lesson) {
    console.log('Không tìm thấy bài nhỏ Schools');
    return mongoose.disconnect();
  }
  // Xóa các từ vựng mẫu cũ nếu có
  await Vocabulary.deleteMany({ word: { $in: ['school','teacher','student','mathematics'] } });

  const vocabularies = [
    {
      word: 'school',
      pronunciation: 'skuːl',
      meaning: 'Trường học',
      example: 'She goes to school every day.',
      image: 'https://img.freepik.com/free-photo/group-young-students-are-discussing-their-project_1150-11014.jpg',
      category: 'basic',
      topic: 'education',
      difficulty: 1,
      lesson: lesson._id
    },
    {
      word: 'teacher',
      pronunciation: 'ˈtiː.tʃər',
      meaning: 'Giáo viên',
      example: 'The teacher is very kind.',
      image: 'https://img.freepik.com/free-photo/teacher-explaining-lesson-group-students_1150-11015.jpg',
      category: 'basic',
      topic: 'education',
      difficulty: 1,
      lesson: lesson._id
    },
    {
      word: 'student',
      pronunciation: 'ˈstjuː.dənt',
      meaning: 'Học sinh',
      example: 'Each student has a book.',
      image: 'https://img.freepik.com/free-photo/portrait-happy-student-holding-books_1150-11016.jpg',
      category: 'basic',
      topic: 'education',
      difficulty: 1,
      lesson: lesson._id
    },
    {
      word: 'mathematics',
      pronunciation: 'ˌmæθəˈmætɪks',
      meaning: 'Môn Toán, Toán học (n)',
      example: 'He likes numbers, so he likes studying Mathematics.',
      image: 'https://img.freepik.com/free-photo/blackboard-mathematics_1150-11017.jpg',
      category: 'basic',
      topic: 'education',
      difficulty: 1,
      lesson: lesson._id
    }
  ];
  await Vocabulary.insertMany(vocabularies);
  console.log('Đã thêm dữ liệu mẫu từ vựng cho bài nhỏ Schools!');
  mongoose.disconnect();
}

seed(); 