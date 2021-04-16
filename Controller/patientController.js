const mongoose = require('mongoose');
const patient = mongoose.model('patient');
const fs = require('fs');
const moment = require('moment');

exports.addPatient = (req, res, next) => {
    console.log(req.body);
    let date = moment().format('DD-MM-YYYY');
    let caseID = '';
    if (req.body) {
        try {
            patient.find({ date: date }, (error, data) => {
                if (error) {
                    console.log(error);
                } else if (data) {
                    if (data.length === 0) {
                        caseID = moment().format('DDMMYYYY') + '01';
                    } else {
                        caseID = moment().format('DDMMYYYY') + '0' + (data.length + 1);
                    }
                    if (!req.file) {
                        try {
                            const addPatient = new patient({
                                caseID: caseID,
                                name: req.body.name,
                                gender: req.body.gender,
                                age: req.body.age,
                                phNo: req.body.phNo,
                                district: req.body.district,
                                homeTown: req.body.homeTown,
                                dengueStatus: req.body.dengueStatus,
                                recommendedHospital: req.body.recommendedHospital,
                                recommendedBy: req.body.recommendedBy,
                                dispensary: req.body.dispensary,
                                caseStatus: req.body.caseStatus,
                                symptoms: req.body.symptoms,
                                date: req.body.date
                            });
                            addPatient
                                .save()
                                .then(result => {
                                    console.log(result)
                                    res.status(200).json({
                                        message: 'Patient Added Successfully!!',
                                        caseID: caseID
                                    });
                                }).catch(error => {
                                    console.log(error)
                                    res.status(400).json({ error: 'error' });
                                });
                        } catch (error) {
                            console.log(error)
                            res.status(500).json({ error: error });
                        }
                    }
                    else {
                        console.log(req.body);
                        console.log('req file: ', req.file);
                        req.body.symptomsImage = 'images/patientsSymptomsImages/' + req.file.originalname;
                        try {
                            const addPatient = new patient({
                                caseID: caseID,
                                name: req.body.name,
                                gender: req.body.gender,
                                age: req.body.age,
                                phNo: req.body.phNo,
                                district: req.body.district,
                                homeTown: req.body.homeTown,
                                dengueStatus: req.body.dengueStatus,
                                recommendedHospital: req.body.recommendedHospital,
                                recommendedBy: req.body.recommendedBy,
                                dispensary: req.body.dispensary,
                                caseStatus: req.body.caseStatus,
                                symptoms: req.body.symptoms,
                                symptomsImage: req.body.symptomsImage,
                                date: req.body.date
                            });
                            addPatient
                                .save()
                                .then(result => {
                                    console.log(result)
                                    res.status(200).json({
                                        message: 'Patient Added Successfully!!',
                                        caseID: caseID
                                    });
                                }).catch(error => {
                                    console.log(error)
                                    res.status(400).json({ error: 'error' });
                                });
                        } catch (error) {
                            console.log(error)
                            res.status(500).json({ error: error });
                        }
                    }
                }
            }).catch(error => {
                console.log(console.error());
            })
        } catch (error) {
            console.log(error);
        }
    }
}

exports.fetchAllPatients = (req, res, next) => {
    console.log(req.body);
    let obj = { recommendedBy: req.body.recommendedBy };
    try {
        if (req.body.selectedOption !== 'all') {
            obj = {
                recommendedBy: req.body.recommendedBy,
                dengueStatus: req.body.selectedOption
            }
        }
        console.log('obj: ', obj);
        patient.find(obj, (error, data) => {
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
            console.log(error)
            res.status(400).json({ error: 'error' });
        })
    } catch (error) {
        console.log(error);
    }
};

exports.fetchSpecificCurrentCases = (req, res, next) => {
    console.log('req body: ', req.body);
    try {
        patient.find({ recommendedHospital: req.body.hospital }, (error, data) => {
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
            console.log(error)
            res.status(400).json({ error: 'error' });
        })
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

exports.fetchSpecificDateCases = (req, res, next) => {
    console.log(req.body.date);
    try {
        patient.find({ date: req.body.date }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(data.length);
                res.json(data.length);
            }
        });
    } catch (error) {
        console.log(error);
    }
};