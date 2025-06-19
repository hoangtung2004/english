const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { isAuthenticated } = require('../middleware/auth');

// Routes cho profile
router.get('/', isAuthenticated, profileController.getProfile);
router.post('/update', isAuthenticated, profileController.updateProfile);
router.post('/change-password', isAuthenticated, profileController.changePassword);

module.exports = router; 