const mongoose = require('mongoose');
const patient = mongoose.model('patient');

exports.addPatient = (req, res, next) => {
    try {
        const addPatient = new patient({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            monthYear: req.body.monthYear,
            phNo: req.body.phNo,
            city: req.body.city,
            address: req.body.address,
            dengueStatus: req.body.dengueStatus,
            recommendedHospital: req.body.recommendedHospital,
            recommendedBy: req.body.recommendedBy,
            date: req.body.date
        });
        addPatient
            .save()
            .then(result => {
                console.log(result)
            });
        res.status(200).json({ Message: 'Paitent Added Successfully!!' });
    } catch (error) {
        res.status(500).json({ Error: error });
    }
};

exports.fetchAllPatients = (req, res, next) => {

    try {
        patient.find({}, (error, data) => {
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
        });
    } catch (error) {
        console.log(error);
    }
};

exports.findRecord = (req, res, next) => {
    console.log(req.body.userName);
    try {
        patient.findOne({ userName: req.body.userName }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(data)
                res.send(data);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.deleteRecord = (req, res, next) => {
    console.log(req.body.userName);
    try {
        patient.deleteOne({ userName: req.body.userName }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(data)
                res.json({ message: 'record deleted Successfully' });
            }
        });
    } catch (error) {
        console.log(error);
    }
};