const express = require('express');
const router = express.Router();

const requestController = require('../Controller/requestController');

router.post('/addRequest', requestController.addRequest);
router.post('/fetchAllRequests', requestController.fetchAllRequests);
router.post('/findOneRequest', requestController.findRequest);
router.delete('/deleteOneRequest', requestController.deleteRequest);
router.put('/updateOneRequest', requestController.updateRequest);
router.post('/requestReply', requestController.requestReply);
router.post('/fetchSpecificRequests', requestController.fetchSpecificRequests);

module.exports = router;