const mongoose = require('mongoose');
const User = require('../models/User');
const Vocabulary = require('../models/Vocabulary');
const UserVocabularyProgress = require('../models/UserVocabularyProgress');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/english-cdcs');
  const user = await User.findOne({ username: "1234" });
  if (!user) throw new Error('Không tìm thấy user hoc sinh');
  const allVocab = await Vocabulary.find({});
  if (allVocab.length < 60) throw new Error('Cần ít nhất 60 từ vựng để seed');
  // Lấy ngẫu nhiên các từ
  function pick(n, used) {
    const arr = [];
    while (arr.length < n) {
      const idx = Math.floor(Math.random() * allVocab.length);
      if (!used.has(idx)) {
        arr.push(allVocab[idx]._id);
        used.add(idx);
      }
    }
    return arr;
  }
  const used = new Set();
  const level1 = pick(10, used);
  const level2 = pick(15, used);
  // const level3 = pick(0, used); // 0 từ cấp 3
  const level4 = pick(5, used);
  const level5 = pick(30, used);
  // Xóa các tiến độ cũ của user này
  await UserVocabularyProgress.deleteMany({ user: user._id });
  // Seed từng nhóm
  const now = new Date();
  const docs = [];
  level1.forEach(vocabId => docs.push({ user: user._id, vocabulary: vocabId, level: 1, nextReviewDate: now }));
  level2.forEach(vocabId => docs.push({ user: user._id, vocabulary: vocabId, level: 2, nextReviewDate: now }));
  level4.forEach(vocabId => docs.push({ user: user._id, vocabulary: vocabId, level: 4, nextReviewDate: now }));
  level5.forEach(vocabId => docs.push({ user: user._id, vocabulary: vocabId, level: 5, nextReviewDate: now }));
  await UserVocabularyProgress.insertMany(docs);
  console.log('Seed thành công!');
  process.exit();
}
seed().catch(e => { console.error(e); process.exit(1); }); 