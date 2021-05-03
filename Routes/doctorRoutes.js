const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const verifyDoctorToken = require('../MiddleWares/verifyDoctorToken');
const doctorController = require('../Controller/doctorController');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/doctorsDp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/addDoctor', verifyAdminToken(), doctorController.addDoctor);
router.get('/fetchAllDoctors', verifyAdminToken(), doctorController.fetchAllDoctors);
router.get('/findOneDoctorsRecord?:id', verifyAdminToken(), doctorController.findRecord);
router.delete('/deleteOneDoctorsRecord?:id', verifyAdminToken(), doctorController.deleteRecord);
router.put('/updateOneDoctorsRecord', verifyAdminToken(), doctorController.updateRecord);
router.put('/updateDoctorProfile', verifyDoctorToken(), upload.single("dp"), doctorController.updateProfile);


module.exports = router;