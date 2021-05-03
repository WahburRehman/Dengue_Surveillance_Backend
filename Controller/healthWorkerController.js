const mongoose = require('mongoose');
const fs = require('fs');
const healthWorker = mongoose.model('healthWorker');
require('dotenv').config()

const sendMail = require('../MiddleWares/sendMail');


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



exports.addHealthWorker = (req, res, next) => {

    let imagePath = 'images/healthWorkersDp/avatar.jpeg';

    console.log('received req body: ', req.body);

    const subject = 'Dengue Surveillance And Data Collection System';

    const msg = "<strong>ASSALAM-O-ALAIKUM!</strong><br><p>Dear " + req.body.name + ", You have successfully added in <strong>Dengue Surveillance And Data Collection System</strong>."
        + " You can log in into the system using the username: " + req.body.userName +
        " and password: " + req.body.password + ". Your user name is constant and cannot be changed."
        + " However you can change your password by logging in into the system.<br><br>Regards."
        + "<br>Dengue Surveillance and Data Collection Team.</p>";

    try {
        const addHealthWorker = new healthWorker({
            name: req.body.name.toUpperCase(),
            userName: req.body.userName.toUpperCase(),
            email: req.body.email.toUpperCase(),
            password: req.body.password,
            gender: req.body.gender.toUpperCase(),
            dob: req.body.dob,
            cnic: req.body.cnic,
            contactNo: req.body.contactNo,
            city: req.body.city.toUpperCase(),
            dispensary: req.body.instituteName.toUpperCase(),
            joiningDate: req.body.joiningDate,
            status: req.body.status.toUpperCase(),
            dp: imagePath
        });
        addHealthWorker
            .save()
            .then(result => {
                console.log('result: ', result)
                sendMail.sendMail(req.body.email, msg, subject);
                res.status(200).json({ message: 'Health-Worker Added Successfully!!' });
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    console.log(error);
                    return res.json({ error: 'User Already Exist!!', cause: error.keyValue });
                }
                console.log(error);
                res.json({ error: error });
            })
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.fetchAllHealthWorkers = (req, res, next) => {
    try {
        healthWorker.find({}).sort({ _id: -1 })
            .then(async result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send({ message: 'healthWorkers not found!!' });
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
    let imagePath = null;
    try {
        healthWorker.findOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else if (data) {
                console.log(data)
                imagePath = data.dp;
                let image = null
                image = fs.readFileSync(imagePath);
                console.log(error);
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
        healthWorker.deleteOne({ _id: req.query.id }, (error, data) => {
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
        healthWorker.findOne({ _id: req.body.id })
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

exports.updateProfile = (req, res, next) => {
    console.log(req.body);
    console.log('email: ', req.body.email);
    console.log('contactNo: ', req.body.contactNo);
    console.log('password: ', req.body.password);
    console.log('req file: ', req.file);
    if (!req.file) {
        try {
            healthWorker.findOne({ _id: req.body.id })
                .then(user => {
                    req.body.email ? user.email = req.body.email : null;
                    req.body.contactNo ? user.contactNo = req.body.contactNo : null;
                    req.body.password ? user.password = req.body.password : null;
                    user
                        .save()
                        .then(async (data) => {
                            data.dp = await fs.readFileSync(data.dp).toString('base64');
                            res.status(200).json({ message: 'Data Updated Successfully!!', data });
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
        console.log('email: ', req.body.email);
        console.log('contactNo: ', req.body.contactNo);
        console.log('password: ', req.body.password);
        console.log('req file: ', req.file);
        req.body.dp = 'images/healthWorkersDp/' + new Date().toISOString() + req.file.originalname;
        try {
            healthWorker.findOne({ _id: req.body.id })
                .then(user => {
                    req.body.email ? user.email = req.body.email : null;
                    req.body.contactNo ? user.contactNo = req.body.contactNo : null;
                    req.body.password ? user.password = req.body.password : null;
                    user.dp = req.body.dp;
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
};



exports.sendSMS = (req, res, next) => {
    try {
        let recipients = req.body.recipients
        console.log(recipients)
        // recipients.forEach(number => {
        //     var message = client.messages.create({
        //         body: req.body.campaignMessage,
        //         from: '+17278003654',
        //         to: number
        //     })
        //         .then(message => console.log(message))
        //         .catch(error => console.log(error));
        // });
    } catch (error) {
        console.log(error);
    }
};
