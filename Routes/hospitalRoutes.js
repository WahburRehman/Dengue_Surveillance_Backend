const express = require('express');
const router = express.Router();

const hospitalController = require('../Controller/hospitalController');

router.post('/addHospital', hospitalController.addHospital);
router.get('/fetchAllHospitals', hospitalController.fetchAllHospitals);
router.post('/findOneHospitalsRecord', hospitalController.findRecord);
router.delete('/deleteOneHospitalsRecord', hospitalController.deleteRecord);

module.exports = router;