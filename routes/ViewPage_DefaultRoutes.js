const express = require('express');
const ViewPageController = require('../controllers/ViewPageController');

const router = express.Router();

router.get('/', ViewPageController.viewPage_index);
router.post('/', ViewPageController.viewPage_Post_ImageAndDetails); 

module.exports = router;