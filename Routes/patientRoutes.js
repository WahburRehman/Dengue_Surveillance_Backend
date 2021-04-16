const express = require('express');
const router = express.Router();
const multer = require('multer');

const patientController = require('../Controller/patientController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/patientsSymptomsImages/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/addPatient', upload.single("symptomsImage"), patientController.addPatient);
router.post('/fetchAllPatients', patientController.fetchAllPatients);
router.post('/findOnePatientsRecord', patientController.findRecord);
router.delete('/deleteOnePatientsRecord', patientController.deleteRecord);
router.post('/fetchSpecificDateCases', patientController.fetchSpecificDateCases);
router.post('/fetchSpecificCurrentCases', patientController.fetchSpecificCurrentCases);

module.exports = router;