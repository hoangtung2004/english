const express = require('express');
const router = express.Router();
const toeicController = require('../controllers/toeicController');
const { isAuthenticated } = require('../middleware/auth');

// Trang chính của TOEIC, hiển thị danh sách các bài test
router.get('/', toeicController.listTests);

// Route chọn part trước khi làm bài
router.get('/select-parts', toeicController.renderSelectParts);

// Route làm bài thi TOEIC
router.get('/test', toeicController.renderTest);

// Route nộp bài
router.post('/submit', isAuthenticated, toeicController.submitTest);

module.exports = router;