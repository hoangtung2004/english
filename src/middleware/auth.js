// Middleware kiểm tra đăng nhập
exports.isAuthenticated = (req, res, next) => {
    console.log('Session user:', req.session.user);
    if (req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
};

// Middleware kiểm tra quyền admin
exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(403).render('error', {
        message: 'Bạn không có quyền truy cập trang này',
        error: {}
    });
};

// Middleware kiểm tra quyền user
exports.isUser = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'user') {
        return next();
    }
    res.status(403).render('error', {
        message: 'Bạn không có quyền truy cập trang này',
        error: {}
    });
}; 