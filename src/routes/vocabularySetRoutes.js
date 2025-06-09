const express = require('express');
const router = express.Router();
const controller = require('../controllers/vocabularySetController');
const { isAdmin } = require('../middleware/auth');

// User xem danh sách bộ từ vựng
router.get('/', controller.list);

// Admin quản lý
router.get('/admin/vocabulary-sets', isAdmin, controller.adminList);
router.get('/admin/vocabulary-sets/create', isAdmin, controller.getCreate);
router.post('/admin/vocabulary-sets/create', isAdmin, controller.postCreate);
router.get('/admin/vocabulary-sets/edit/:id', isAdmin, controller.getEdit);
router.post('/admin/vocabulary-sets/edit/:id', isAdmin, controller.postEdit);
router.post('/admin/vocabulary-sets/delete/:id', isAdmin, controller.delete);

module.exports = router; 