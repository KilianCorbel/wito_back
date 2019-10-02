const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const professeurAction = require('./professeurAction');

const lienConnection = "/login";
const lienCreate = '/create';

//--Connexion
router.post(lienConnection, professeurAction.checkAuth);

// -- CREATE
router.post(lienCreate, professeurAction.actionCreate);

module.exports = router;
