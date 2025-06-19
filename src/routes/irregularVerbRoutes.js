const express = require('express');
const router = express.Router();
const irregularVerbController = require('../controllers/irregularVerbController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, irregularVerbController.getIrregularVerbs);
 
module.exports = router; 