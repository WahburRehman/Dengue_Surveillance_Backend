const express = require('express');
const router = express.Router();
const multer = require('multer');

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

router.post('/addHealthWorker', healthWorkerController.addHealthWorker);
router.get('/fetchAllHealthWorkers', healthWorkerController.fetchAllHealthWorkers);
router.post('/findOneHealthWorkersRecord', healthWorkerController.findRecord);
router.delete('/deleteOneHealthWorkersRecord', healthWorkerController.deleteRecord);

module.exports = router;