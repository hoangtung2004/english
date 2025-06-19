const express = require('express');
const router = express.Router();
const path = require('path');

// Route để phục vụ ảnh
router.get('/:set/:type/:filename', (req, res) => {
    const { set, type, filename } = req.params;
    const imagePath = path.join(__dirname, '..', 'public', 'images', set, type, filename);
    res.sendFile(imagePath);
});

module.exports = router; 