const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const pdfAction = require('./pdfAction');

const lienGenerate = '/:id';

// -- GENERATE BY ID
router.get(lienGenerate, pdfAction.actionGenerate);

module.exports = router;