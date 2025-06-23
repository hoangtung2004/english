const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Routes cho profile
router.get('/', isAuthenticated, profileController.getProfile);
router.post('/update', isAuthenticated, profileController.updateProfile);
router.post('/change-password', isAuthenticated, profileController.changePassword);

// Route để upload avatar
router.post('/update-avatar', isAuthenticated, upload.single('avatar'), profileController.updateAvatar);

module.exports = router; 