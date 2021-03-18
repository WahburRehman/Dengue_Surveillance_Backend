const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patient = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    monthYear: {
        type: String,
        required: true
    },
    phNo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dengueStatus: {
        type: String,
        required: true
    },
    recommendedHospital: {
        type: String,
        required: true
    },
    recommendedBy: {
        type: String,
        required: true
    },
    dispensaryName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


patient.pre('save', function (next) {
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


patient.methods.comparePassword = function (candidatePassword) {
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


mongoose.model('patient', patient);