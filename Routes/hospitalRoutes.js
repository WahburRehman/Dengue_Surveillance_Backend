const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const verifyHealthWorkerToken = require('../MiddleWares/verifyHealthWorkerToken');
const hospitalController = require('../Controller/hospitalController');

router.post('/addHospital', verifyAdminToken(), hospitalController.addHospital);
router.get('/fetchAllHospitals', verifyAdminToken(), hospitalController.fetchAllHospitals);
router.get('/fetchAllhospitalsNames', verifyHealthWorkerToken(), hospitalController.fetchAllhospitalsNames);
router.get('/findOneHospitalsRecord?:id', verifyAdminToken(), hospitalController.findRecord);
router.delete('/deleteOneHospitalsRecord?:id', verifyAdminToken(), hospitalController.deleteRecord);
router.put('/updateOneHospitalsRecord', verifyAdminToken(), hospitalController.updateRecord);

module.exports = router;