const express = require('express');
const router = express.Router();

const researcherController = require('../Controller/researcherController');

router.post('/addResearcher', researcherController.addResearcher);

module.exports = router;