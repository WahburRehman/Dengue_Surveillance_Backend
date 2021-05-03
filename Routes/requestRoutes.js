const express = require('express');
const router = express.Router();
const verifyToken = require('../MiddleWares/verifyToken');
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const verifyHealthWorkerToken = require('../MiddleWares/verifyHealthWorkerToken');
const requestController = require('../Controller/requestController');

router.post('/addRequest', verifyHealthWorkerToken(), requestController.addRequest);
router.get('/fetchAllRequests', verifyAdminToken(), requestController.fetchAllRequests);
router.get('/findOneRequest?:id?:role', verifyToken(), requestController.findRequest);
router.delete('/deleteOneRequest?:id?:role', verifyToken(), requestController.deleteRequest);
// router.put('/updateOneRequest', requestController.updateRequest);
router.post('/requestReply', verifyAdminToken(), requestController.requestReply);
router.get('/fetchSpecificRequests?:requesterID', verifyHealthWorkerToken(), requestController.fetchSpecificRequests);

module.exports = router;