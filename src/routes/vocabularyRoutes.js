const express = require('express');
const router = express.Router();
const vocabularyController = require('../controllers/vocabularyController');
const { isAuthenticated } = require('../middleware/auth');

// Hiển thị danh sách bộ từ vựng
router.get('/', isAuthenticated, vocabularyController.getVocabularySets);
// Hiển thị danh sách bài nhỏ trong bộ
router.get('/set/:id', isAuthenticated, vocabularyController.getLessonsBySet);
// Hiển thị từ vựng của một bài nhỏ
router.get('/lesson/:lessonId', isAuthenticated, vocabularyController.getVocabularyByLesson);
// Học từ vựng theo flashcard
router.get('/lesson/:lessonId/flashcard', isAuthenticated, vocabularyController.getFlashcardLesson);

// Routes công khai
router.get('/:id', vocabularyController.getVocabulary);

// Routes yêu cầu đăng nhập
router.get('/create', isAuthenticated, vocabularyController.getCreateVocabulary);
router.post('/create', isAuthenticated, vocabularyController.createVocabulary);
router.post('/:vocabularyId/progress', isAuthenticated, vocabularyController.updateLearningProgress);

module.exports = router; 