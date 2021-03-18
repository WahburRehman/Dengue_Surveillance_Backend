const express = require('express');
const router = express.Router();

const hospitalController = require('../Controller/hospitalController');

router.post('/addHospital', hospitalController.addHospital);

module.exports = router;