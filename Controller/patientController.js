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