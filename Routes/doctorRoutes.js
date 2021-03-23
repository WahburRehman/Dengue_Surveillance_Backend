const express = require('express');
const router = express.Router();

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

const upload = multer({ storage: storage });

router.post('/addDoctor', doctorController.addDoctor);
router.get('/fetchAllDoctors', doctorController.fetchAllDoctors);
router.post('/findOneDoctorsRecord', doctorController.findRecord);
router.delete('/deleteOneDoctorsRecord', doctorController.deleteRecord);

module.exports = router;