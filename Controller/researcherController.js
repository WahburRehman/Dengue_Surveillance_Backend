const mongoose = require('mongoose');
const fs = require('fs');
const researcher = mongoose.model('researcher');

const sendMail = require('../MiddleWares/sendMail');

exports.addResearcher = (req, res, next) => {

    console.log(req.body)

    let imagePath = 'images/researchersDp/avatar.jpeg';

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
                sendMail.sendMail(req.body.email, msg);
                res.status(200).json({ message: 'Researcher Added Successfully!!'});
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    console.log(error.keyValue);
                    return res.json({ error: 'User Already Exist!!'});
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
        researcher.find({}, (error, data) => {
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
};

exports.findRecord = (req, res, next) => {
    console.log(req.body.userName);
    try {
        researcher.findOne({ userName: req.body.userName.toUpperCase() }, (error, data) => {
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
    console.log(req.body.userName);
    try {
        researcher.deleteOne({ userName: req.body.userName.toUpperCase() }, (error, data) => {
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