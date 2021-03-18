const mongoose = require('mongoose');
const researcher = mongoose.model('researcher');

const sendMail = require('../MiddleWares/sendMail');

exports.addResearcher = (req, res, next) => {

    const imagePath = 'images/researchersDp/researchersDp.png';

    const msg = "<strong>ASSALAM-O-ALAIKUM!</strong><br><p>Dear " + req.body.name + ", You have successfully added in <strong>Dengue Surveillance And Data Collection System</strong>."
        + " You can log in into the system using the username: " + req.body.userName +
        " and password: " + req.body.password + ". Your user name is constant and cannot be changed."
        + " However you can change your password by logging in into the system.<br><br>Regards."
        + "<br>Dengue Surveillance and Data Collection Team.</p>";

    try {
        const addResearcher = new researcher({
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            dob: req.body.dob,
            cnic: req.body.cnic,
            contactNo: req.body.contactNo,
            city: req.body.city,
            joiningDate: req.body.joiningDate,
            status: req.body.status,
            dp: req.file.path
        });
        addResearcher
            .save()
            .then(result => {
                console.log(result)
                sendMail.sendMail(req.body.email, msg);
                res.status(200).json({ message: 'Researcher Added Successfully!!', cause: error.keyValue });
            }).catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    console.log(error.keyValue);
                    return res.json({ error: 'User Already Exist with', cause: error.keyValue });
                }
                console.log(error)
                res.status(200).json({ error: error });
            })

    } catch (error) {
        res.status(500).json({ error: error });
    }
};