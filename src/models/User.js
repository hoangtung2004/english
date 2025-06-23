const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    avatarUrl: {
        type: String,
        default: '/images/avatars/default.png'
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    learningProgress: [{
        vocabulary: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vocabulary'
        },
        status: {
            type: String,
            enum: ['not_learned', 'learning', 'mastered'],
            default: 'not_learned'
        },
        lastReview: Date,
        nextReview: Date,
        reviewCount: {
            type: Number,
            default: 0
        }
    }],
    dailyGoal: {
        type: Number,
        default: 10
    },
    streak: {
        type: Number,
        default: 0
    },
    lastStudyDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password trước khi lưu
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Phương thức so sánh password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Phương thức kiểm tra quyền admin
userSchema.methods.isAdmin = function() {
    return this.role === 'admin';
};

module.exports = mongoose.model('User', userSchema); 