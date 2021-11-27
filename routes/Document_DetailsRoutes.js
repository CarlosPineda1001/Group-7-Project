const express = require('express');

const DocumentDetailsController = require('../controllers/DocumentDetailsController')

const router = express.Router();

router.get('/:id', DocumentDetailsController.viewDocDetails);

module.exports = router;