const mongoose = require('mongoose');

const report = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    reportMessage: {
        type: String,
        required: true,
    },
    reporterName: {
        type: String,
        required: true,
    },
    reporterID: {
        type: String,
        required: true,
    },
    reporterRole: {
        type: String,
        required: true,
    },
    reportStatus: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

mongoose.model('report', report);