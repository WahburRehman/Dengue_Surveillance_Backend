const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs')
const admin = mongoose.model('admin');

const sendMail = require('../MiddleWares/sendMail');




exports.addAdmin = (req, res, next) => {
    const imagePath = 'images/adminDp/avatar.jpeg';

    console.log('received req body: ', req.body);

    const msg = "<strong>ASSALAM-O-ALAIKUM!</strong><br><p>Dear " + req.body.name + ", You have successfully added in <strong>Dengue Surveillance And Data Collection System</strong>."
        + " You can log in into the system using the username: " + req.body.userName +
        " and password: " + req.body.password + ". Your user name is constant and cannot be changed."
        + " However you can change your password by logging in into the system.<br><br>Regards."
        + "<br>Dengue Surveillance and Data Collection Team.</p>";

    try {
        const addAdmin = new admin({
            name: req.body.name.toUpperCase(),
            userName: req.body.userName.toUpperCase(),
            email: req.body.email.toUpperCase(),
            password: req.body.password,
            dob: req.body.dob,
            gender: req.body.gender.toUpperCase(),
            cnic: req.body.cnic,
            contactNo: req.body.contactNo,
            city: req.body.city.toUpperCase(),
            joiningDate: req.body.joiningDate,
            status: req.body.status.toUpperCase(),
            dp: imagePath
        });
        console.log('??')
        addAdmin
            .save()
            .then(result => {
                console.log('result: ', result)
                sendMail.sendMail(req.body.email, msg);
                res.status(200).json({ message: 'Admin Added Successfully!!' });
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    console.log(error);
                    return res.json({ error: 'User Already Exist!!', cause: error.keyValue });
                }
                console.log(error);
                res.json({ error: error });
            })
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

exports.findRecord = (req, res, next) => {
    console.log(req.body.userName);
    try {
        admin.findOne({ userName: req.body.userName.toUpperCase() }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
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


exports.updateRecord = (req, res, next) => {
    //$2b$10$6eyvlsBvbu/OypBb95mKs.62k38pnrAe/Hb8AyHyDqgP2gXKVqcky
    //$2b$10$3szsLk5CZ6/7NGrakoP/Ye9GXTAq/oqK1mBUz12E6W2JxR9OzCrYa
    // console.log(req.body);
    if (!req.file) {
        try {
            admin.findOne({ userName: req.body.userName.toUpperCase() })
                .then(user => {
                    user.contactNo = req.body.contactNo;
                    user.email = req.body.email;
                    user.password = req.body.password;
                    user
                        .save()
                        .then(result => {
                            console.log('result: ', result)
                            res.status(200).json({ message: 'Data Updated Successfully!!' });
                        }).catch(error => {
                            console.log(error);
                            res.status(200).json({ error: 'Data Could Not Be Updated!!' });
                        })
                }).catch(error => {
                    console.log(error);
                    res.send(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('?')
        console.log(req.file.path);
        console.log('before: ' + req.body.dp)
        req.body.dp = 'images/adminDp/' + req.file.originalname;
        console.log('after: ' + req.body.dp)
        try {
            admin.findOne({ userName: req.body.userName.toUpperCase() })
                .then(user => {
                    user.contactNo = req.body.contactNo;
                    user.email = req.body.email;
                    user.password = req.body.password;
                    user.dp = req.body.dp;
                    user
                        .save()
                        .then(result => {
                            if(e){

                            }
                            console.log('result: ', result)
                            res.status(200).json({ message: 'Data Updated Successfully!!' });
                        }).catch(error => {
                            console.log(error);
                            res.status(200).json({ error: 'Data Could Not Be Updated!!' });
                        })
                }).catch(error => {
                    console.log(error);
                    res.send(error);
                })
        } catch (error) {
            console.log(error);
        }
    }
};

