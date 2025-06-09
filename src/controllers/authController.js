const User = require('../models/User');

// Hiển thị form đăng nhập
exports.getLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Đăng nhập',
        error: null
    });
};

// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
    try {
        console.log('Session user:', req.session.user);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.render('auth/login', {
                title: 'Đăng nhập',
                error: 'Email không tồn tại'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('auth/login', {
                title: 'Đăng nhập',
                error: 'Mật khẩu không đúng'
            });
        }

        req.session.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        res.redirect('/');
    } catch (error) {
        console.error('Login error:', error);
        res.render('auth/login', {
            title: 'Đăng nhập',
            error: 'Có lỗi xảy ra, vui lòng thử lại'
        });
    }
};

// Hiển thị form đăng ký
exports.getRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Đăng ký',
        error: null
    });
};

// Xử lý đăng ký
exports.postRegister = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.render('auth/register', {
                title: 'Đăng ký',
                error: 'Mật khẩu xác nhận không khớp'
            });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.render('auth/register', {
                title: 'Đăng ký',
                error: 'Email hoặc tên người dùng đã tồn tại'
            });
        }

        const user = new User({
            username,
            email,
            password
        });

        await user.save();
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Register error:', error);
        res.render('auth/register', {
            title: 'Đăng ký',
            error: 'Có lỗi xảy ra, vui lòng thử lại'
        });
    }
};

// Đăng xuất
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}; 