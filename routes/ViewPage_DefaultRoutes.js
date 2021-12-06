const express = require('express');

//import controllers
const ViewPageController = require('../controllers/ViewPageController');

const router = express.Router();

//get list of document group in viewpage
router.get('/', ViewPageController.viewPage_index);

//displaying images in the document details page
router.get('/document/:filename', ViewPageController.viewPage_image);

module.exports = router;