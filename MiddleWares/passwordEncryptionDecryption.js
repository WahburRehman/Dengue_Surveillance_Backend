const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const passwordEncDec = (actor) => {
    const role = mongoose.model(actor);
    role.pre('save', function (next) {
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
};

module.exports = passwordEncDec;