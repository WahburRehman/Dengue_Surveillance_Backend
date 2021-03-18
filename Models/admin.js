const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const admin = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    joiningDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active",
    },
    dp: {
        type: String,
    }
});


admin.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});


admin.methods.comparePassword = function (candidatePassword) {
    return new Promise((resolve, reject) => {
        const user = this;
        bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
            if (error) {
                return reject(error)
            }
            if (!isMatch) {
                return reject(error)
            }
            resolve(true);
        });
    });
}


mongoose.model('admin', admin);