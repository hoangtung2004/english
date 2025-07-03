const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Cấu hình middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware để truyền thông tin user vào tất cả các view
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/english-learning', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Đã kết nối với MongoDB'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const vocabularyRoutes = require('./routes/vocabularyRoutes');
const practiceRoutes = require('./routes/practiceRoutes');
const irregularVerbRoutes = require('./routes/irregularVerbRoutes');
const profileRoutes = require('./routes/profileRoutes');
const ipaRoutes = require('./routes/ipaRoutes');
const toeicRoutes = require('./routes/toeicRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/auth', authRoutes);
app.use('/lessons', lessonRoutes);
app.use('/vocabulary', vocabularyRoutes);
app.use('/practice', practiceRoutes);
app.use('/irregular-verbs', irregularVerbRoutes);
app.use('/profile', profileRoutes);
app.use('/ipa', ipaRoutes);
app.use('/toeic', toeicRoutes);
app.use('/admin', adminRoutes);

// Route đặc biệt để phục vụ ảnh
app.get('/images/:set/:type/:filename', (req, res) => {
    const { set, type, filename } = req.params;
    const imagePath = path.join(__dirname, '..', 'public', 'images', set, type, filename);
    console.log('Đang tìm ảnh tại:', imagePath);
    res.sendFile(imagePath);
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Học Tiếng Anh' });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
}); 