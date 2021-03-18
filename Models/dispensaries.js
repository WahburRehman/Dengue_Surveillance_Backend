const mongoose = require('mongoose');

const dispensary = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: "Active"
    }
});

mongoose.model('dispensary', dispensary);