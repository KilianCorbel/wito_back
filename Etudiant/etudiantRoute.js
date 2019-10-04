const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const etudiantAction = require('./etudiantAction');

const lienConnection = "/login";
const lienCreate = '/create';
const lienUpdate = '/update/:id';
const lienDelete = '/delete/:id';
const lienGet = '/get/:id';

//--Connexion
router.post(lienConnection, etudiantAction.checkAuth);

// -- CREATE
router.post(lienCreate, etudiantAction.actionCreate);

// -- UPDATE
router.put(lienUpdate, etudiantAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, etudiantAction.actionDelete);

// -- READ ID
router.get(lienGet, etudiantAction.actionRead);

module.exports = router;