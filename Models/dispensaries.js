const mongoose = require('mongoose');

const dispensary = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
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
    },
    joiningDate: {
        type: String,
        required: true
    }
});

mongoose.model('dispensary', dispensary);