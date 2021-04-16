const express = require('express');
const router = express.Router();

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

const upload = multer({ dest: '/images/adminDp/' });

router.post('/addAdmin', adminController.addAdmin);
router.post('/findOneAdminsRecord', adminController.findRecord);
router.put('/updateOneAdminRecord', upload.single("dp"), adminController.updateRecord);

module.exports = router;