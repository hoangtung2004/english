const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Hiển thị trang profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).select('-password');
        res.render('profile/index', {
            title: 'Hồ sơ cá nhân',
            user,
            success: req.query.success,
            error: req.query.error
        });
    } catch (error) {
        res.status(500).render('error', {
            message: 'Lỗi khi tải thông tin hồ sơ',
            error
        });
    }
};

// Cập nhật thông tin profile
exports.updateProfile = async (req, res) => {
    try {
        const { username, email, fullName } = req.body;
        
        // Kiểm tra email đã tồn tại chưa (trừ user hiện tại)
        const existingUser = await User.findOne({ 
            email, 
            _id: { $ne: req.session.user._id } 
        });
        
        if (existingUser) {
            return res.redirect('/profile?error=Email đã được sử dụng bởi tài khoản khác');
        }

        // Cập nhật thông tin
        const updatedUser = await User.findByIdAndUpdate(
            req.session.user._id,
            { username, email, fullName },
            { new: true }
        ).select('-password');

        // Cập nhật session
        req.session.user = updatedUser;

        res.redirect('/profile?success=Cập nhật thông tin thành công');
    } catch (error) {
        res.redirect('/profile?error=Lỗi khi cập nhật thông tin');
    }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // Kiểm tra mật khẩu mới
        if (newPassword !== confirmPassword) {
            return res.redirect('/profile?error=Mật khẩu mới không khớp');
        }

        if (newPassword.length < 6) {
            return res.redirect('/profile?error=Mật khẩu phải có ít nhất 6 ký tự');
        }

        // Lấy user với mật khẩu
        const user = await User.findById(req.session.user._id);
        
        // Kiểm tra mật khẩu hiện tại
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.redirect('/profile?error=Mật khẩu hiện tại không đúng');
        }

        // Mã hóa mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu
        await User.findByIdAndUpdate(req.session.user._id, {
            password: hashedPassword
        });

        res.redirect('/profile?success=Đổi mật khẩu thành công');
    } catch (error) {
        res.redirect('/profile?error=Lỗi khi đổi mật khẩu');
    }
};

// Cập nhật avatar
exports.updateAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.redirect('/profile?error=Vui lòng chọn một file ảnh');
        }

        const user = await User.findById(req.session.user._id);

        // Xóa avatar cũ nếu nó không phải là avatar mặc định
        if (user.avatarUrl && user.avatarUrl !== '/images/avatars/default.png') {
            const oldAvatarPath = path.join(__dirname, '..', '..', 'public', user.avatarUrl);
            if (fs.existsSync(oldAvatarPath)) {
                fs.unlinkSync(oldAvatarPath);
            }
        }

        // Cập nhật đường dẫn avatar mới
        const newAvatarUrl = '/images/avatars/' + req.file.filename;
        const updatedUser = await User.findByIdAndUpdate(
            req.session.user._id,
            { avatarUrl: newAvatarUrl },
            { new: true }
        ).select('-password');

        // Cập nhật session
        req.session.user = updatedUser;

        res.redirect('/profile?success=Cập nhật ảnh đại diện thành công');
    } catch (error) {
        res.redirect('/profile?error=Lỗi khi cập nhật ảnh đại diện: ' + error.message);
    }
}; 