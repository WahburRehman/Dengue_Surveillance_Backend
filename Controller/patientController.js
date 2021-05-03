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
                                    console.log('result: ', result)
                                    res.send({
                                        message: 'Patient Added Successfully!!',
                                        caseID: caseID
                                    });
                                }).catch(error => {
                                    console.log(error)
                                    res.send({ error: 'error' });
                                });
                        } catch (error) {
                            console.log(error)
                            res.status(500).json({ error: 'catch error' });
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
                                    res.send({
                                        message: 'Patient Added Successfully!!',
                                        caseID: caseID
                                    });
                                }).catch(error => {
                                    console.log(error)
                                    res.send({ error: 'error' });
                                });
                        } catch (error) {
                            console.log(error)
                            res.send({ error: 'catch error' });
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
    console.log(req.query);
    try {
        patient.find({ recommendedBy: req.query.recommendedBy }).sort({ _id: -1 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send(result);
                }
                else {
                    console.log(result.length);
                    let newResult = result.map(item => {
                        if (item.symptomsImage) {
                            item.symptomsImage = fs.readFileSync(item.symptomsImage).toString('base64');
                            return item
                        } else {
                            return item
                        }
                    })
                    console.log(newResult[0]);
                    res.send(newResult);
                }
            }).catch(error => {
                console.log(error)
                res.status(400).json({ error: 'error' });
            });
    } catch (error) {
        console.log(error);
    }
};

exports.fetchSpecificHospitalPatients = (req, res, next) => {
    console.log(req.query);
    try {
        patient.find({ recommendedHospital: req.query.recommendedHospital.toUpperCase() }).sort({ _id: -1 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send(result);
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

exports.fetchSpecificCurrentCases = (req, res, next) => {
    console.log('req body: ', req.query);
    try {
        patient.find({ recommendedHospital: req.query.recommendedHospital.toUpperCase() }, (error, data) => {
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
    console.log(req.query);
    try {
        patient.findOne({ _id: req.query.id }, async (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else if (data) {
                console.log(data)
                if (data.symptomsImage) {
                    data.symptomsImage = await fs.readFileSync(data.symptomsImage).toString('base64');
                }
                res.send(data);
            }
        }).catch(error => {
            console.log('catch error: ', error)
        })
    } catch (error) {
        console.log(error);
    }
};

exports.deleteRecord = (req, res, next) => {
    console.log(req.query);
    try {
        patient.deleteOne({ _id: req.query.patientID}, (error, data) => {
            if (error) {
                console.log(error);
                res.send({ error: 'Record Could not be deleted' });
            } else {
                console.log(data)
                res.json({ message: 'record deleted Successfully' });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.updateRecord = (req, res, next) => {
    console.log('req body: ', req.body);
    try {
        patient.findOne({ _id: req.body.patientID })
            .then(user => {
                user.dengueStatus = req.body.dengueStatus
                user.doctorResponse = req.body.doctorResponse
                user.respondedBy = req.body.respondedBy
                user.caseStatus = req.body.caseStatus
                user
                    .save()
                    .then(result => {
                        console.log('result: ', result)
                        res.status(200).json({ message: 'Response Has Been Sent Successfully!!' });
                    }).catch(error => {
                        console.log(error);
                        res.status(400).json({ error: 'Response Could Not Be Sent!!' });
                    })
            }).catch(error => {
                console.log(error);
                res.status(400).json({ error: error });
            })
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