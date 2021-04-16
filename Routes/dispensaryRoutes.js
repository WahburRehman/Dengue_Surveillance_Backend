const express = require('express');
const router = express.Router();

const dispensaryController = require('../Controller/dispensaryController');

router.post('/addDispensary', dispensaryController.addDispensary);
router.get('/fetchAllDispensaries', dispensaryController.fetchAllDispensaries);
router.post('/findOneDispensariesRecord', dispensaryController.findRecord);
router.delete('/deleteOneDispensariesRecord', dispensaryController.deleteRecord);
router.put('/updateOneDispensariesRecord', dispensaryController.updateRecord);

module.exports = router;