const express = require('express');
const router = express.Router();
const practiceController = require('../controllers/practiceController');

router.get('/', practiceController.getPractice);
router.get('/data', practiceController.getPracticeData);
router.post('/progress', practiceController.updatePracticeProgress);
router.get('/level-stats', practiceController.getLevelStats);
 
module.exports = router; 