const User = require('../models/User');
const Lesson = require('../models/Lesson');
const VocabularySet = require('../models/VocabularySet');
const VocabularyLesson = require('../models/VocabularyLesson');
const Vocabulary = require('../models/Vocabulary');
const IrregularVerb = require('../models/IrregularVerb');
const ToeicTest = require('../models/ToeicTest');

exports.dashboard = (req, res) => {
  res.render('admin/dashboard');
};

exports.users = async (req, res) => {
  try {
    const { username, email, role, level } = req.query;
    let filter = {};
    if (username) filter.username = { $regex: username, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    if (role) filter.role = role;
    if (level) filter.level = level;
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.render('admin/users', { users, search: { username, email, role, level } });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách users');
  }
};

exports.lessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });
    res.render('admin/lessons', { lessons });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách bài học');
  }
};

exports.vocabularySets = async (req, res) => {
  try {
    const sets = await VocabularySet.find().sort({ createdAt: -1 });
    res.render('admin/vocabulary-sets', { sets });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách bộ từ vựng');
  }
};

exports.toeicTests = async (req, res) => {
  try {
    const tests = await ToeicTest.find().sort({ createdAt: -1 });
    res.render('admin/toeic-tests', { tests });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách đề thi');
  }
};

exports.toeicResults = (req, res) => {
  res.render('admin/toeic-results');
};

exports.irregularVerbs = async (req, res) => {
  try {
    const verbs = await IrregularVerb.find().sort({ baseForm: 1 });
    res.render('admin/irregular-verbs', { verbs });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách động từ');
  }
};

exports.irregularVerbCreateForm = (req, res) => {
  res.render('admin/irregular-verb-create');
};

exports.irregularVerbCreate = async (req, res) => {
  try {
    const { baseForm, pastSimple, pastParticiple, meaning } = req.body;
    await IrregularVerb.create({ baseForm, pastSimple, pastParticiple, meaning });
    res.redirect('/admin/irregular-verbs');
  } catch (err) {
    res.status(500).send('Lỗi khi thêm động từ');
  }
};

exports.irregularVerbEditForm = async (req, res) => {
  try {
    const verb = await IrregularVerb.findById(req.params.id);
    if (!verb) return res.status(404).send('Không tìm thấy động từ');
    res.render('admin/irregular-verb-edit', { verb });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy thông tin động từ');
  }
};

exports.irregularVerbEdit = async (req, res) => {
  try {
    const { baseForm, pastSimple, pastParticiple, meaning } = req.body;
    await IrregularVerb.findByIdAndUpdate(req.params.id, { baseForm, pastSimple, pastParticiple, meaning });
    res.redirect('/admin/irregular-verbs');
  } catch (err) {
    res.status(500).send('Lỗi khi cập nhật động từ');
  }
};

exports.irregularVerbDelete = async (req, res) => {
  try {
    await IrregularVerb.findByIdAndDelete(req.params.id);
    res.redirect('/admin/irregular-verbs');
  } catch (err) {
    res.status(500).send('Lỗi khi xóa động từ');
  }
};

exports.lessonCreateForm = (req, res) => {
  res.render('admin/lesson-create');
};

exports.lessonCreate = async (req, res) => {
  try {
    const { title, description, level, content } = req.body;
    await Lesson.create({ title, description, level, content });
    res.redirect('/admin/lessons');
  } catch (err) {
    res.status(500).send('Lỗi khi thêm bài học');
  }
};

exports.lessonEditForm = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) return res.status(404).send('Không tìm thấy bài học');
    res.render('admin/lesson-edit', { lesson });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy thông tin bài học');
  }
};

exports.lessonEdit = async (req, res) => {
  try {
    const { title, description, level, content } = req.body;
    await Lesson.findByIdAndUpdate(req.params.id, { title, description, level, content });
    res.redirect('/admin/lessons');
  } catch (err) {
    res.status(500).send('Lỗi khi cập nhật bài học');
  }
};

exports.lessonDelete = async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.redirect('/admin/lessons');
  } catch (err) {
    res.status(500).send('Lỗi khi xóa bài học');
  }
};

exports.vocabularySetCreateForm = (req, res) => {
  res.render('admin/vocabulary-set-create');
};

exports.vocabularySetCreate = async (req, res) => {
  try {
    const { name, description, icon, color, status } = req.body;
    await VocabularySet.create({ name, description, icon, color, status });
    res.redirect('/admin/vocabulary-sets');
  } catch (err) {
    res.status(500).send('Lỗi khi thêm bộ từ vựng');
  }
};

exports.vocabularySetEditForm = async (req, res) => {
  try {
    const set = await VocabularySet.findById(req.params.id);
    if (!set) return res.status(404).send('Không tìm thấy bộ từ vựng');
    const topics = await VocabularyLesson.find({ set: set._id }).sort({ createdAt: -1 });
    res.render('admin/vocabulary-set-edit', { set, topics });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy thông tin bộ từ vựng');
  }
};

exports.vocabularySetEdit = async (req, res) => {
  try {
    const { name, description, icon, color, status } = req.body;
    await VocabularySet.findByIdAndUpdate(req.params.id, { name, description, icon, color, status });
    res.redirect('/admin/vocabulary-sets');
  } catch (err) {
    res.status(500).send('Lỗi khi cập nhật bộ từ vựng');
  }
};

exports.vocabularySetDelete = async (req, res) => {
  try {
    await VocabularySet.findByIdAndDelete(req.params.id);
    res.redirect('/admin/vocabulary-sets');
  } catch (err) {
    res.status(500).send('Lỗi khi xóa bộ từ vựng');
  }
};

exports.vocabTopics = async (req, res) => {
  try {
    const setId = req.params.setId;
    const set = await VocabularySet.findById(setId);
    if (!set) return res.status(404).send('Không tìm thấy bộ từ vựng');
    const topics = await VocabularyLesson.find({ set: setId }).sort({ createdAt: -1 });
    res.render('admin/vocab-topics', { set, topics });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách chủ đề');
  }
};

exports.vocabTopicCreateForm = async (req, res) => {
  const set = await VocabularySet.findById(req.params.setId);
  res.render('admin/vocab-topic-create', { set });
};

exports.vocabTopicCreate = async (req, res) => {
  try {
    const { name, description } = req.body;
    await VocabularyLesson.create({ name, description, set: req.params.setId });
    res.redirect(`/admin/vocabulary-sets/${req.params.setId}/topics`);
  } catch (err) {
    res.status(500).send('Lỗi khi thêm chủ đề');
  }
};

exports.vocabTopicEditForm = async (req, res) => {
  try {
    const set = await VocabularySet.findById(req.params.setId);
    const topic = await VocabularyLesson.findById(req.params.topicId);
    if (!topic) return res.status(404).send('Không tìm thấy chủ đề');
    const words = await Vocabulary.find({ lesson: topic._id }).sort({ createdAt: -1 });
    res.render('admin/vocab-topic-edit', { set, topic, words });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy thông tin chủ đề');
  }
};

exports.vocabTopicEdit = async (req, res) => {
  try {
    const { name, description } = req.body;
    await VocabularyLesson.findByIdAndUpdate(req.params.topicId, { name, description });
    res.redirect(`/admin/vocabulary-sets/${req.params.setId}/topics`);
  } catch (err) {
    res.status(500).send('Lỗi khi cập nhật chủ đề');
  }
};

exports.vocabTopicDelete = async (req, res) => {
  try {
    await VocabularyLesson.findByIdAndDelete(req.params.topicId);
    res.redirect(`/admin/vocabulary-sets/${req.params.setId}/topics`);
  } catch (err) {
    res.status(500).send('Lỗi khi xóa chủ đề');
  }
};

exports.vocabWords = async (req, res) => {
  try {
    const set = await VocabularySet.findById(req.params.setId);
    const topic = await VocabularyLesson.findById(req.params.topicId);
    if (!set || !topic) return res.status(404).send('Không tìm thấy bộ từ vựng hoặc chủ đề');
    const words = await Vocabulary.find({ lesson: req.params.topicId }).sort({ createdAt: -1 });
    res.render('admin/vocab-words', { set, topic, words });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy danh sách từ vựng');
  }
};

exports.vocabWordCreateForm = async (req, res) => {
  const set = await VocabularySet.findById(req.params.setId);
  const topic = await VocabularyLesson.findById(req.params.topicId);
  res.render('admin/vocab-word-create', { set, topic });
};

exports.vocabWordCreate = async (req, res) => {
  try {
    const { word, meaning, pronunciation, example, image, category, topic: topicName, difficulty } = req.body;
    await Vocabulary.create({ word, meaning, pronunciation, example, image, category, topic: topicName, difficulty, lesson: req.params.topicId });
    res.redirect(`/admin/vocabulary-sets/${req.params.setId}/topics/${req.params.topicId}/words`);
  } catch (err) {
    res.status(500).send('Lỗi khi thêm từ vựng');
  }
};

exports.vocabWordEditForm = async (req, res) => {
  const set = await VocabularySet.findById(req.params.setId);
  const topic = await VocabularyLesson.findById(req.params.topicId);
  const word = await Vocabulary.findById(req.params.wordId);
  res.render('admin/vocab-word-edit', { set, topic, word });
};

exports.vocabWordEdit = async (req, res) => {
  try {
    const { word, meaning, pronunciation, example, image, category, topic: topicName, difficulty } = req.body;
    await Vocabulary.findByIdAndUpdate(req.params.wordId, { word, meaning, pronunciation, example, image, category, topic: topicName, difficulty });
    res.redirect(`/admin/vocabulary-sets/${req.params.setId}/topics/${req.params.topicId}/words`);
  } catch (err) {
    res.status(500).send('Lỗi khi cập nhật từ vựng');
  }
};

exports.vocabWordDelete = async (req, res) => {
  try {
    await Vocabulary.findByIdAndDelete(req.params.wordId);
    res.redirect(`/admin/vocabulary-sets/${req.params.setId}/topics/${req.params.topicId}/words`);
  } catch (err) {
    res.status(500).send('Lỗi khi xóa từ vựng');
  }
};

exports.toeicTestCreateForm = (req, res) => {
  res.render('admin/toeic-test-create');
};

exports.toeicTestCreate = async (req, res) => {
  try {
    const { title, description, parts } = req.body;
    await ToeicTest.create({ title, description, parts });
    res.redirect('/admin/toeic-tests');
  } catch (err) {
    res.status(500).send('Lỗi khi thêm đề thi');
  }
};

exports.toeicTestEditForm = async (req, res) => {
  try {
    const test = await ToeicTest.findById(req.params.id);
    if (!test) return res.status(404).send('Không tìm thấy đề thi');
    res.render('admin/toeic-test-edit', { test });
  } catch (err) {
    res.status(500).send('Lỗi khi lấy thông tin đề thi');
  }
};

exports.toeicTestEdit = async (req, res) => {
  try {
    const { title, description, parts } = req.body;
    await ToeicTest.findByIdAndUpdate(req.params.id, { title, description, parts });
    res.redirect('/admin/toeic-tests');
  } catch (err) {
    res.status(500).send('Lỗi khi cập nhật đề thi');
  }
};

exports.toeicTestDelete = async (req, res) => {
  try {
    await ToeicTest.findByIdAndDelete(req.params.id);
    res.redirect('/admin/toeic-tests');
  } catch (err) {
    res.status(500).send('Lỗi khi xóa đề thi');
  }
}; 