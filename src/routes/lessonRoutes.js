const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Routes cho bài học
router.get('/', lessonController.getAllLessons);
router.get('/create', lessonController.getCreateLesson);
router.post('/create', lessonController.createLesson);
router.get('/:id', lessonController.getLesson);

module.exports = router; 