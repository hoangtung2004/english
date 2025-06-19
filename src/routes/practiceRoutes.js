const express = require('express');
const router = express.Router();
const practiceController = require('../controllers/practiceController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, practiceController.getPractice);
router.get('/data', isAuthenticated, practiceController.getPracticeData);
router.post('/progress', isAuthenticated, practiceController.updatePracticeProgress);
router.get('/level-stats', isAuthenticated, practiceController.getLevelStats);
 
module.exports = router; 