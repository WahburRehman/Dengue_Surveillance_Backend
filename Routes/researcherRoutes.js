const express = require('express');
const router = express.Router();

const researcherController = require('../Controller/researcherController');

router.post('/addResearcher', researcherController.addResearcher);
router.get('/fetchAllResearchers', researcherController.fetchAllResearchers);
router.post('/findOneResearchersRecord', researcherController.findRecord);
router.delete('/deleteOneResearchersRecord', researcherController.deleteRecord);
router.put('/updateOneResearchersRecord', researcherController.updateRecord);

module.exports = router;