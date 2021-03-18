const express = require('express');
const router = express.Router();

const adminController = require('../Controller/adminController');

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

router.post('/addAdmin', adminController.addAdmin);

module.exports = router;