const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Dashboard
router.get('/', adminController.dashboard);

// Quản lý Users
router.get('/users', adminController.users);

// Quản lý Bài học
router.get('/lessons', adminController.lessons);
router.get('/lessons/create', adminController.lessonCreateForm);
router.post('/lessons/create', adminController.lessonCreate);
router.get('/lessons/:id/edit', adminController.lessonEditForm);
router.post('/lessons/:id/edit', adminController.lessonEdit);
router.post('/lessons/:id/delete', adminController.lessonDelete);

// Quản lý Bộ từ vựng
router.get('/vocabulary-sets', adminController.vocabularySets);
router.get('/vocabulary-sets/create', adminController.vocabularySetCreateForm);
router.post('/vocabulary-sets/create', adminController.vocabularySetCreate);
router.get('/vocabulary-sets/:id/edit', adminController.vocabularySetEditForm);
router.post('/vocabulary-sets/:id/edit', adminController.vocabularySetEdit);
router.post('/vocabulary-sets/:id/delete', adminController.vocabularySetDelete);

// Quản lý Chủ đề từ vựng
router.get('/vocabulary-sets/:setId/topics', adminController.vocabTopics);
router.get('/vocabulary-sets/:setId/topics/create', adminController.vocabTopicCreateForm);
router.post('/vocabulary-sets/:setId/topics/create', adminController.vocabTopicCreate);
router.get('/vocabulary-sets/:setId/topics/:topicId/edit', adminController.vocabTopicEditForm);
router.post('/vocabulary-sets/:setId/topics/:topicId/edit', adminController.vocabTopicEdit);
router.post('/vocabulary-sets/:setId/topics/:topicId/delete', adminController.vocabTopicDelete);

// Quản lý từ vựng trong chủ đề
router.get('/vocabulary-sets/:setId/topics/:topicId/words', adminController.vocabWords);
router.get('/vocabulary-sets/:setId/topics/:topicId/words/create', adminController.vocabWordCreateForm);
router.post('/vocabulary-sets/:setId/topics/:topicId/words/create', adminController.vocabWordCreate);
router.get('/vocabulary-sets/:setId/topics/:topicId/words/:wordId/edit', adminController.vocabWordEditForm);
router.post('/vocabulary-sets/:setId/topics/:topicId/words/:wordId/edit', adminController.vocabWordEdit);
router.post('/vocabulary-sets/:setId/topics/:topicId/words/:wordId/delete', adminController.vocabWordDelete);

// Quản lý Động từ bất quy tắc
router.get('/irregular-verbs', adminController.irregularVerbs);
router.get('/irregular-verbs/create', adminController.irregularVerbCreateForm);
router.post('/irregular-verbs/create', adminController.irregularVerbCreate);
router.get('/irregular-verbs/:id/edit', adminController.irregularVerbEditForm);
router.post('/irregular-verbs/:id/edit', adminController.irregularVerbEdit);
router.post('/irregular-verbs/:id/delete', adminController.irregularVerbDelete);

module.exports = router; 