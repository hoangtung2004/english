const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Routes cho bài học
router.get('/', isAuthenticated, lessonController.getAllLessons);
router.get('/create', isAuthenticated, isAdmin, lessonController.getCreateLesson);
router.post('/create', isAuthenticated, isAdmin, lessonController.createLesson);
router.get('/:id', isAuthenticated, lessonController.getLesson);

module.exports = router; 