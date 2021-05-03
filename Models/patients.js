const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const patient = new mongoose.Schema({
    caseID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phNo: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true
    },
    homeTown: {
        type: String,
        required: true
    },
    dengueStatus: {
        type: String,
        required: true
    },
    recommendedHospital: {
        type: String,
        required: true
    },
    recommendedBy: {
        type: String,
        required: true
    },
    dispensary: {
        type: String,
        required: true
    },
    caseStatus: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    symptomsImage: {
        type: String,
    },
    doctorResponse: {
        type: String,
    },
    responsedBy: {
        type: String,
    },
    date: {
        type: String
    }
});


mongoose.model('patient', patient);