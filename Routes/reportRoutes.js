const express = require('express');
const router = express.Router();
const verifyToken = require('../MiddleWares/verifyToken');
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const reportController = require('../Controller/reportController');

router.post('/addReport?:role', verifyToken(), reportController.addReport);
router.get('/fetchAllReports', verifyAdminToken(), reportController.fetchAllReports);
router.get('/findOneReport?:id?:role', verifyToken(), reportController.findReport);
router.delete('/deleteOneReport?:id?:role', verifyToken(), reportController.deleteReport);
// router.put('/updateOneReport', reportController.updateReport);
router.post('/reportReply', verifyAdminToken(), reportController.reportReply);
router.get('/fetchSpecificReports?:reporterID?:role', verifyToken(), reportController.fetchSpecificReports);


module.exports = router;