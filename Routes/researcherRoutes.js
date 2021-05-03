const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../MiddleWares/verifyAdminToken');
const verifyResearcherToken = require('../MiddleWares/verifyResearcherToken');
const researcherController = require('../Controller/researcherController');


const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/researchersDp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/addResearcher', verifyAdminToken(), researcherController.addResearcher);
router.get('/fetchAllResearchers', verifyAdminToken(), researcherController.fetchAllResearchers);
router.get('/findOneResearchersRecord?:id', verifyAdminToken(), researcherController.findRecord);
router.delete('/deleteOneResearchersRecord?:id', verifyAdminToken(), researcherController.deleteRecord);
router.put('/updateOneResearchersRecord', verifyAdminToken(), researcherController.updateRecord);
router.put('/updateResearcherProfile', verifyResearcherToken(), upload.single("dp"), researcherController.updateProfile);

module.exports = router;