const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../MiddleWares/verifyToken');
const verifyHealthWorkerToken = require('../MiddleWares/verifyHealthWorkerToken');
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
const actor = 'healthWorker';
//, verifyToken(actor)

router.post('/addPatient', verifyHealthWorkerToken(), upload.single("symptomsImage"), patientController.addPatient);
router.get('/fetchAllPatients?:recommendedBy', verifyHealthWorkerToken(), patientController.fetchAllPatients);
router.get('/findOnePatientsRecord?:id?:role', verifyToken(), patientController.findRecord);
router.delete('/deleteOnePatientsRecord?:patientID', verifyHealthWorkerToken(), patientController.deleteRecord);
router.put('/updateOnePatientRecord?:role', verifyToken(), patientController.updateRecord);
router.post('/fetchSpecificDateCases', patientController.fetchSpecificDateCases);
router.post('/fetchSpecificCurrentCases', patientController.fetchSpecificCurrentCases);
router.get('/fetchSpecificHospitalPatients?:recommendedHospital', verifyToken('doctor'), patientController.fetchSpecificHospitalPatients);

module.exports = router;