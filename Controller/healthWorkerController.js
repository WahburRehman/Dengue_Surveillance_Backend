const mongoose = require('mongoose');
const healthWorker = mongoose.model('healthWorker');

const sendMail = require('../MiddleWares/sendMail');


exports.addHealthWorker = (req, res, next) => {
    const imagePath = 'images/healthWorkersDp/healthWorkersDp.png';

    console.log('received req body: ', req.body);

    const msg = "<strong>ASSALAM-O-ALAIKUM!</strong><br><p>Dear " + req.body.name + ", You have successfully added in <strong>Dengue Surveillance And Data Collection System</strong>."
        + " You can log in into the system using the username: " + req.body.userName +
        " and password: " + req.body.password + ". Your user name is constant and cannot be changed."
        + " However you can change your password by logging in into the system.<br><br>Regards."
        + "<br>Dengue Surveillance and Data Collection Team.</p>";

    try {
        const addHealthWorker = new healthWorker({
            name: req.body.name,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            gender: req.body.gender,
            cnic: req.body.cnic,
            contactNo: req.body.contactNo,
            city: req.body.city,
            dispensary: req.body.instituteName,
            joiningDate: req.body.joiningDate,
            status: req.body.status,
            dp: imagePath
        });
        addHealthWorker
            .save()
            .then(result => {
                console.log('result: ', result)
                sendMail.sendMail(req.body.email, msg);
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