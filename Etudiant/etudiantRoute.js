const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const etudiantAction = require('./etudiantAction');

const lienConnection = "/login";
const lienCreate = '/create';

//--Connexion
router.post(lienConnection, etudiantAction.checkAuth);

// -- CREATE
router.post(lienCreate, etudiantAction.actionCreate);

module.exports = router;
