const express = require('express');
const router = express.Router();
const irregularVerbController = require('../controllers/irregularVerbController');

router.get('/', irregularVerbController.getIrregularVerbs);
 
module.exports = router; 