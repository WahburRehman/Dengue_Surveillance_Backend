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

    console.log(req.body)
    try {
        request.find({ requestStatus: req.body.requestStatus }, (error, data) => {
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
}

exports.findRequest = (req, res, next) => {
    console.log('request id: ', req.body.id);
    try {
        request.findOne({ _id: req.body.id }, (error, data) => {
            if (error) {
                console.log(error);
                res.json({ error: error });
            } else if (data) {
                console.log(data)
                res.send(data);
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
    console.log(req.body.id);
    try {
        request.deleteOne({ _id: req.body.id }, (error, data) => {
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
    console.log('req id: ' + req.body.reporterID);
    console.log('req subject: ' + req.body.subject);
    console.log('req message: ' + req.body.message);

    // 6059142e97ab942584075528

    //605915ef97ab942584075529

    try {
        healthWorker.findOne({ _id: req.body.reporterID })
            .then(data => {
                if (data) {
                    console.log(data);
                    sendMail.sendMail(data.email, req.body.message, req.body.subject);
                    res.json({ message: "Reply Sent Successfully!!" });
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
    console.log(req.body)
    try {

        request.find({ requesterID: req.body.requesterID, requestStatus: req.body.requestStatus }, (error, data) => {
            if (error) {
                console.log(error);
                return res.json({ error: error });
            }
            else if (data) {
                if (data.length === 0) {
                    console.log('data length', data.length);
                    res.json({ message: "No Records Found!!" });
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
}



