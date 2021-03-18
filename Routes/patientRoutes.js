const express = require('express');
const router = express.Router();

const patientController = require('../Controller/patientController');

router.post('/addPatient', patientController.addPatient);

module.exports = router;