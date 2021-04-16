const mongoose = require('mongoose');
const fs = require('fs');
const doctor = mongoose.model('doctor');

const sendMail = require('../MiddleWares/sendMail');

exports.addDoctor = (req, res, next) => {

    console.log(req.body);


    let imagePath = 'images/doctorsDp/avatar.jpeg';

    const subject = 'Dengue Surveillance And Data Collection System';

    const msg = "<strong>ASSALAM-O-ALAIKUM!</strong><br><p>Dear " + req.body.name + ", You have successfully added in <strong>Dengue Surveillance And Data Collection System</strong>."
        + " You can log in into the system using the username: " + req.body.userName +
        " and password: " + req.body.password + ". Your user name is constant and cannot be changed."
        + " However you can change your password by logging in into the system.<br><br>Regards."
        + "<br>Dengue Surveillance and Data Collection Team.</p>";
    try {
        const addDoctor = new doctor({
            name: req.body.name.toUpperCase(),
            userName: req.body.userName.toUpperCase(),
            email: req.body.email.toUpperCase(),
            password: req.body.password,
            gender: req.body.gender.toUpperCase(),
            dob: req.body.dob,
            cnic: req.body.cnic,
            contactNo: req.body.contactNo,
            city: req.body.city.toUpperCase(),
            hospital: req.body.instituteName.toUpperCase(),
            joiningDate: req.body.joiningDate,
            status: req.body.status.toUpperCase(),
            dp: imagePath
        });
        addDoctor
            .save()
            .then(result => {
                console.log(result)
                sendMail.sendMail(req.body.email, msg, subject);
                res.status(200).json({ message: 'Doctor Added Successfully!!' });
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    console.log(error.keyValue);
                    return res.json({ error: 'User Already Exist!!' });
                }
                console.log(error)
                res.status(200).json({ error: error });
            });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.fetchAllDoctors = (req, res, next) => {

    try {
        doctor.find({}, (error, data) => {
            if (error) {
                console.log(error);
                return res.json({ error: error });
            }
            else {
                if (data.length === 0) {
                    console.log('data length', data.length);
                    res.send(data);
                }
                else {
                    console.log(data);
                    res.send(data);
                }
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    } catch (error) {
        console.log(error);
    }
}

exports.findRecord = (req, res, next) => {
    console.log(req.body.id);
    try {
        doctor.findOne({ _id: req.body.id }, (error, data) => {
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

exports.deleteRecord = (req, res, next) => {
    console.log(req.body.id);
    try {
        doctor.deleteOne({ _id: req.body.id }, (error, data) => {
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
        doctor.findOne({ _id: req.body.id })
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
                    user.hospital = req.body.instituteName.toUpperCase(),
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