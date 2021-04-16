const express = require('express');
const router = express.Router();

const reportController = require('../Controller/reportController');

router.post('/addReport', reportController.addReport);
router.post('/fetchAllReports', reportController.fetchAllReports);
router.post('/findOneReport', reportController.findReport);
router.delete('/deleteOneReport', reportController.deleteReport);
router.put('/updateOneReport', reportController.updateReport);
router.post('/reportReply', reportController.reportReply);
router.post('/fetchSpecificReports', reportController.fetchSpecificReports);


module.exports = router;