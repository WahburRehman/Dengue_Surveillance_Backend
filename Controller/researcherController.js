const mongoose = require('mongoose');
const fs = require('fs');
const researcher = mongoose.model('researcher');

const sendMail = require('../MiddleWares/sendMail');

exports.addResearcher = (req, res, next) => {

    console.log(req.body)

    let imagePath = 'images/researchersDp/avatar.jpeg';

    const subject = 'Dengue Surveillance And Data Collection System';

    const msg = "<strong>ASSALAM-O-ALAIKUM!</strong><br><p>Dear " + req.body.name + ", You have successfully added in <strong>Dengue Surveillance And Data Collection System</strong>."
        + " You can log in into the system using the username: " + req.body.userName +
        " and password: " + req.body.password + ". Your user name is constant and cannot be changed."
        + " However you can change your password by logging in into the system.<br><br>Regards."
        + "<br>Dengue Surveillance and Data Collection Team.</p>";

    try {
        const addResearcher = new researcher({
            name: req.body.name.toUpperCase(),
            userName: req.body.userName.toUpperCase(),
            email: req.body.email.toUpperCase(),
            password: req.body.password,
            gender: req.body.gender.toUpperCase(),
            dob: req.body.dob,
            cnic: req.body.cnic,
            contactNo: req.body.contactNo,
            city: req.body.city.toUpperCase(),
            joiningDate: req.body.joiningDate,
            status: req.body.status.toUpperCase(),
            dp: imagePath
        });
        addResearcher
            .save()
            .then(result => {
                console.log(result)
                sendMail.sendMail(req.body.email, msg, subject);
                res.status(200).json({ message: 'Researcher Added Successfully!!' });
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    console.log(error.keyValue);
                    return res.json({ error: 'User Already Exist!!' });
                }
                console.log(error)
                res.status(200).json({ error: error });
            })

    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.fetchAllResearchers = (req, res, next) => {
    try {
        researcher.find({}).sort({ _id: -1 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send({ message: 'researchers not found!!' });
                }
                else {
                    console.log(result);
                    res.send(result);
                }
            }).catch(error => {
                console.log(error)
                res.status(400).json({ error: 'error' });
            });
    } catch (error) {
        console.log(error);
    }
};

exports.findRecord = (req, res, next) => {
    console.log(req.query.id);
    try {
        researcher.findOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else if (data) {
                console.log(data)
                imagePath = data.dp;
                let image = fs.readFileSync(imagePath);
                let encodedImage = image.toString('base64');
                data.dp = encodedImage;
                res.send(data);
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        });
    } catch (error) {
        console.log(error);
    }
};


exports.deleteRecord = (req, res, next) => {
    console.log(req.query.id);
    try {
        researcher.deleteOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(data)
                res.json({ message: 'record deleted Successfully' });
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    } catch (error) {
        console.log(error);
    }
};


exports.updateRecord = (req, res, next) => {
    console.log('req body: ', req.body);
    //$2b$10$6eyvlsBvbu/OypBb95mKs.62k38pnrAe/Hb8AyHyDqgP2gXKVqcky
    //$2b$10$3szsLk5CZ6/7NGrakoP/Ye9GXTAq/oqK1mBUz12E6W2JxR9OzCrYa
    // console.log(req.body);
    try {
        researcher.findOne({ _id: req.body.id })
            .then(user => {

                user.name = req.body.name.toUpperCase(),
                    user.userName = req.body.userName.toUpperCase(),
                    user.email = req.body.email.toUpperCase(),
                    user.password = user.password,
                    user.gender = req.body.gender.toUpperCase(),
                    user.dob = req.body.dob,
                    user.cnic = req.body.cnic,
                    user.contactNo = req.body.contactNo,
                    user.city = req.body.city.toUpperCase(),
                    user.joiningDate = req.body.joiningDate,
                    user.status = req.body.status.toUpperCase(),
                    user.dp = user.dp
                user
                    .save()
                    .then(result => {
                        console.log('result: ', result)
                        res.status(200).json({ message: 'Data Updated Successfully!!' });
                    }).catch(error => {
                        console.log(error);
                        res.status(400).json({ error: 'Data Could Not Be Updated!!' });
                    })
            }).catch(error => {
                console.log(error);
                res.status(400).json({ error: error });
            })
    } catch (error) {
        console.log(error);
    }
};

exports.updateProfile = (req, res, next) => {
    console.log('req body for update profile: ', req.body);
    if (!req.file) {
        try {
            researcher.findOne({ _id: req.body.id })
                .then(user => {
                    req.body.email ? user.email = req.body.email : null
                    req.body.contactNo ? user.contactNo = req.body.contactNo : null
                    req.body.password ? user.password = req.body.password : null
                    user
                        .save()
                        .then(async result => {
                            result.password = undefined
                            console.log('result: ', result)
                            result.dp = await fs.readFileSync(result.dp).toString('base64');
                            res.status(200).json({ userInfo: result, message: 'Profile Updated Successfully!!' });
                        }).catch(error => {
                            console.log(error);
                            res.status(200).json({ error: 'Profile Could Not Be Updated!!' });
                        })
                }).catch(error => {
                    console.log(error);
                    res.send({ error: 'Profile Could Not Be Updated!!' });
                })
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('?')
        console.log(req.file.path);
        console.log('before: ' + req.body.dp)
        req.body.dp = 'images/researchersDp/' + req.file.originalname;
        console.log('after: ' + req.body.dp)
        try {
            researcher.findOne({ _id: req.body.id })
                .then(user => {
                    req.body.email ? user.email = req.body.email : null
                    req.body.contactNo ? user.contactNo = req.body.contactNo : null
                    req.body.password ? user.password = req.body.password : null
                    user.dp = req.body.dp;
                    user
                        .save()
                        .then(async result => {
                            result.password = undefined
                            console.log('result: ', result)
                            result.dp = await fs.readFileSync(result.dp).toString('base64');
                            res.status(200).json({ userInfo: result, message: 'Profile Updated Successfully!!' });
                        }).catch(error => {
                            console.log(error);
                            res.status(200).json({ error: 'Profile Could Not Be Updated!!' });
                        })
                }).catch(error => {
                    console.log('catch error: ', error);
                    res.send({ error: error });
                })
        } catch (error) {
            console.log(error);
        }
    }
};