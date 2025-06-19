const express = require('express');
const router = express.Router();
const ipaController = require('../controllers/ipaController');
const { isAuthenticated } = require('../middleware/auth');

// Routes cho bảng phiên âm IPA
router.get('/', isAuthenticated, ipaController.getIPATable);
router.get('/practice', isAuthenticated, ipaController.getIPAPractice);
router.post('/practice/check', isAuthenticated, ipaController.checkIPAPractice);

module.exports = router; 