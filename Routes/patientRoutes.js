const express = require('express');
const router = express.Router();

const patientController = require('../Controller/patientController');

router.post('/addPatient', patientController.addPatient);
router.get('/fetchAllPatients', patientController.fetchAllPatients);
router.post('/findOnePatientsRecord', patientController.findRecord);
router.delete('/deleteOnePatientsRecord', patientController.deleteRecord);

module.exports = router;