const express = require('express');
const router = express.Router();

const dispensaryController = require('../Controller/dispensaryController');

router.post('/addDispensary', dispensaryController.addDispensary);

module.exports = router;