const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { jwtKey } = require('../keys');
const verify = require('../MiddleWares/verify');
const sendMail = require('../MiddleWares/sendMail');



// router.post('/signUp', async (req, res) => {
//     const { userName, password } = req.body;
//     try {
//         const newHealthWorker = new healthWorker({ userName, password });
//         await newHealthWorker.save();
//         const token = jwt.sign({ userId: newHealthWorker._id }, jwtKey);
//         res.send({ token });
//     } catch (error) {
//         res.send(error.message);
//     }
// });

router.post('/signIn', async (req, res) => {
    const { userName, password, actor } = req.body;


    console.log(req.body);
    console.log(password);
    console.log(actor);
    const role = mongoose.model(actor);
    if (!userName || !password) {
        return res.send({ error: "Must Provide UserName & Password!!" });
    }
    const user = await role.findOne({ userName });
    if (!user) {
        return res.send({ error: "Enter Valid UserName or Password!!" });
    }
    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, jwtKey);
        res.send({ token });
    } catch (error) {
        return res.send({ error: "Enter Valid UserName or Password!!" });
    }
});

router.post('/resetPassword', (req, res) => {
    console.log(req.body);
    let role = req.body.actor;
    let actor = '';
    // let doctor = mongoose.model('doctor');

    if (role === "admin") {
        actor = mongoose.model('admin');
    } else if (role === "doctor") {
        actor = mongoose.model('doctor');
    } else if (role === 'healthWorker') {
        actor = mongoose.model('healthWorker');
    } else if (role === 'researcher') {
        actor = mongoose.model('researcher');
    }

    try {
        actor.findOne({ userName: req.body.userName.toUpperCase() })
            .then(user => {
                if (user) {
                    console.log(user);

                    let password = '';
                    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

                    //password generation
                    for (let i = 1; i <= 8; i++) {
                        let char = Math.floor(Math.random() * str.length + 1);
                        password += str.charAt(char)
                    }

                    console.log('generated password: ', password);

                    console.log('user old password: ', user.password);

                    user.password = password;

                    console.log('user new password: ', user.password);

                    user
                        .save()
                        .then(user => {
                            console.log(user);

                            const subject = 'RESET PASSWORD [Dengue Surveillance]';

                            const msg = "<strong>ASSALAM-O-ALAIKUM!</strong><br><p>Dear " + user.name + ", You request for"
                                + " reset password has been completed successflly. Now you can login into your account "
                                + "by using the password: <strong>" + password + "</strong>.<br>Regards.<br>Dengue Surveillance and Data Collection Team.</p> ";

                            sendMail.sendMail(user.email, msg, subject);

                            res.json({ message: "your new password has been sent to your registered email address!!" });
                        }).catch(error => {
                            console.log(error);
                        });
                }
                else {
                    res.json({ error: "User not found!!" });
                }
            })
            .catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;