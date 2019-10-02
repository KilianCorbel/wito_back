const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const coursAction = require('./coursAction');

const lienCreate = '/create';

// -- CREATE
router.post(lienCreate, coursAction.actionCreate);

module.exports = router;