const mongoose = require('mongoose');
const request = mongoose.model('request');
const healthWorker = mongoose.model('healthWorker');

const sendMail = require('../MiddleWares/sendMail');

exports.addRequest = (req, res, next) => {
    console.log(req.body);
    try {
        const addRequest = new request({
            subject: req.body.subject,
            requestMessage: req.body.message,
            requesterName: req.body.requesterName,
            requesterID: req.body.requesterID,
            requestStatus: req.body.requestStatus,
            date: req.body.date
        });

        addRequest
            .save()
            .then(result => {
                console.log(result);
                res.status(200).json({ message: 'Request Generated Successfully!!' });
            }).catch(error => {
                console.log(error);
                res.json({ error: 'error' });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'error' });
    }
};


exports.fetchAllRequests = (req, res, next) => {
    try {
        request.find({}).sort({ _id: -1 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send({ message: 'requests not found!!' });
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

exports.findRequest = (req, res, next) => {
    console.log('request id: ', req.query.id);
    try {
        request.findOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (data) {
                console.log(data)
                res.send(data);
            } else {
                res.send({ error: 'Request Not Found!!' });
            }
        }).catch(error => {
            console.log(error);
            res.send(error);
        })
    } catch (error) {
        console.log(error);
    }
};

exports.deleteRequest = (req, res, next) => {
    console.log(req.query.id);
    try {
        request.deleteOne({ _id: req.query.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else {
                console.log(data)
                res.json({ message: 'request deleted Successfully' });
            }
        }).catch(error => {
            console.log(error);
            res.json({ error: error });
        })
    } catch (error) {
        console.log(error);
    }
};

exports.updateRequest = (req, res, next) => {
    console.log(req.body.id);

    try {
        request.findOne({ _id: req.body.id })
            .then(record => {
                record.subject = req.body.subject,
                    record.requestMessage = req.body.requestMessage,
                    record.requesterName = req.body.requesterName,
                    record.requesterID = req.body.requesterID,
                    record.requestStatus = req.body.requestStatus,
                    record.date = req.body.requestDate
                user
                    .save()
                    .then(result => {
                        console.log('result: ', result)
                        res.status(200).json({ message: 'Request Updated Successfully!!' });
                    }).catch(error => {
                        console.log(error);
                        res.status(400).json({ error: 'Request Could Not Be Updated!!' });
                    })
            }).catch(error => {
                console.log(error);
                res.status(400).json({ error: error });
            })
    } catch (error) {
        console.log(error);
    }
};

exports.requestReply = (req, res, next) => {
    console.log('req body: ' + req.body);
    try {
        healthWorker.findOne({ _id: req.body.reporterID })
            .then(data => {
                if (data) {
                    console.log(data);
                    sendMail.sendMail(data.email, req.body.message, req.body.subject);
                    request.findOne({ _id: req.body.reportID })
                        .then(result => {
                            if (result) {
                                result.requestStatus = req.body.reportStatus
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
                    res.json({ error: "Reply could not be sent!!" });
                }
            })
            .catch(error => {
                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }
};

exports.fetchSpecificRequests = (req, res, next) => {
    console.log(req.query)
    try {

        request.find({ requesterID: req.query.requesterID }).sort({ _id: -1 })
            .then(result => {
                if (result.length === 0) {
                    console.log('data length', result.length);
                    res.send({ message: 'requests not found!!' });
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



