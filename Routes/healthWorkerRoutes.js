const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const verifyHealthWorkerToken = require('../MiddleWares/verifyHealthWorkerToken');
const healthWorkerController = require('../Controller/healthWorkerController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/healthWorkersDp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/addHealthWorker', verifyAdminToken(), healthWorkerController.addHealthWorker);
router.get('/fetchAllHealthWorkers', verifyAdminToken(), healthWorkerController.fetchAllHealthWorkers);
router.get('/findOneHealthWorkersRecord?:id', verifyAdminToken(), healthWorkerController.findRecord);
router.delete('/deleteOneHealthWorkersRecord?:id', verifyAdminToken(), healthWorkerController.deleteRecord);
router.put('/updateOneHealthWorkersRecord', verifyAdminToken(), healthWorkerController.updateRecord);
router.put('/updateHealthWorkerProfile', verifyHealthWorkerToken(), upload.single("dp"), healthWorkerController.updateProfile);
router.post('/sendSMS', verifyHealthWorkerToken(), healthWorkerController.sendSMS);

module.exports = router;