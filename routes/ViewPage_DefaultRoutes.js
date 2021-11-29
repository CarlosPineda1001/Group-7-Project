const express = require('express');

//import controllers
const ViewPageController = require('../controllers/ViewPageController');

const router = express.Router();

router.get('/', ViewPageController.viewPage_index);
router.get('/document/:filename', ViewPageController.viewPage_image);

module.exports = router;