const mongoose = require('mongoose');
const report = mongoose.model('report');

const sendMail = require('../MiddleWares/sendMail');

exports.addReport = (req, res, next) => {
    console.log(req.body);
    try {
        const addReport = new report({
            subject: req.body.subject,
            reportMessage: req.body.reportMessage,
            reporterName: req.body.reporterName,
            reporterID: req.body.reporterID,
            reporterRole: req.body.reporterRole,
            reportStatus: req.body.reportStatus,
            date: req.body.reportDate
        });

        addReport
            .save()
            .then(result => {
                console.log(result);
                res.status(200).json({ message: 'Report Generated Successfully!!' });
            }).catch(error => {
                console.log(error);
                res.json({ error: 'error' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'error' });
    }
};


exports.fetchAllReports = (req, res, next) => {
    console.log(req.body)
    try {
        report.find({}).sort({ _id: -1 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send({ message: 'reports not found!!' });
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
}

exports.findReport = (req, res, next) => {
    console.log(req.query.id);
    try {
        report.findOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else if (data) {
                console.log(data)
                res.send(data);
            } else {
                res.send({ error: 'Report Not Found!!' });
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    } catch (error) {
        console.log(error);
    }
};

exports.deleteReport = (req, res, next) => {
    console.log(req.query.id);
    try {
        report.deleteOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else {
                console.log(data)
                res.json({ message: 'report deleted Successfully' });
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    } catch (error) {
        console.log(error);
    }
};

exports.updateReport = (req, res, next) => {
    console.log(req.body.id);

    try {
        report.findOne({ _id: req.body.id })
            .then(record => {
                record.subject = req.body.subject,
                    record.reportMessage = req.body.reportMessage,
                    record.reporterName = req.body.reporterName,
                    record.reporterID = req.body.reporterID,
                    record.reporterRole = req.body.reporterRole,
                    record.reportStatus = req.body.reportStatus,
                    record.date = req.body.reportDate
                user
                    .save()
                    .then(result => {
                        console.log('result: ', result)
                        res.status(200).json({ message: 'Report Updated Successfully!!' });
                    }).catch(error => {
                        console.log(error);
                        res.status(400).json({ error: 'Report Could Not Be Updated!!' });
                    })
            }).catch(error => {
                console.log(error);
                res.status(400).json({ error: error });
            })
    } catch (error) {
        console.log(error);
    }
};

exports.reportReply = (req, res, next) => {
    console.log('req body: ' + req.body);
    let role = req.body.reporterRole

    let actor = '';
    // let doctor = mongoose.model('doctor');

    if (role === "doctor") {
        actor = mongoose.model('doctor');
    } else if (role === 'healthWorker') {
        actor = mongoose.model('healthWorker');
    } else if (role === 'researcher') {
        actor = mongoose.model('researcher');
    }

    // 6059142e97ab942584075528

    let data = '';
    try {
        actor.findOne({ _id: req.body.reporterID })
            .then(data => {
                if (data) {
                    console.log(data);
                    sendMail.sendMail(data.email, req.body.message, req.body.subject)
                    report.findOne({ _id: req.body.reportID })
                        .then(result => {
                            if (result) {
                                result.reportStatus = req.body.reportStatus
                                result
                                    .save()
                                    .then(result => {
                                        console.log(result)
                                        res.send({ message: 'Reply Has Been Sent Successfully!!' });
                                    }).catch(error => {
                                        console.log(error);
                                        res.send({ message: 'Reply Could Not Be Sent!!' });
                                    })
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                }
                else {
                    res.json({ error: "Reporter Not Found!!" });
                }
            })
            .catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
};

exports.fetchSpecificReports = (req, res, next) => {
    console.log(req.query)
    try {

        report.find({ reporterID: req.query.reporterID }).sort({ _id: -1 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send({ message: 'complaints not found!!' });
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
}

