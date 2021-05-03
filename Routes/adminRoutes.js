const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const adminController = require('../Controller/adminController');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/adminDp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/addAdmin', adminController.addAdmin);
router.post('/findOneAdminsRecord', adminController.findRecord);
router.put('/updateAdminProfile', verifyAdminToken(), upload.single("dp"), adminController.updateProfile);

module.exports = router;