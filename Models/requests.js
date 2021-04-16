const mongoose = require('mongoose');

const request = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    requestMessage: {
        type: String,
        required: true,
    },
    requesterName: {
        type: String,
        required: true,
    },
    requesterID: {
        type: String,
        required: true,
    },
    requestStatus: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

mongoose.model('request', request);