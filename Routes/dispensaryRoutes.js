const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const dispensaryController = require('../Controller/dispensaryController');

router.post('/addDispensary', verifyAdminToken(), dispensaryController.addDispensary);
router.get('/fetchAllDispensaries', verifyAdminToken(), dispensaryController.fetchAllDispensaries);
router.get('/fetchAllDispensariesNames', verifyAdminToken(), dispensaryController.fetchAllDispensariesNames);
router.get('/findOneDispensariesRecord?:id', verifyAdminToken(), dispensaryController.findRecord);
router.delete('/deleteOneDispensariesRecord?:id', verifyAdminToken(), dispensaryController.deleteRecord);
router.put('/updateOneDispensariesRecord', verifyAdminToken(), dispensaryController.updateRecord);

module.exports = router;