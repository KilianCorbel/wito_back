const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const etudiantAction = require('./etudiantAction');

const lienConnection = "/auth";
const lienAll = '/';
const lienCreate = '/';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';

//--Connexion
router.post(lienConnection, etudiantAction.checkAuth);

// -- FIND ALL
router.get(lienAll, etudiantAction.actionFindAll);

// -- CREATE
router.post(lienCreate, etudiantAction.actionCreate);

// -- UPDATE
router.put(lienUpdate, etudiantAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, etudiantAction.actionDelete);

// -- READ ID
router.get(lienGet, etudiantAction.actionRead);

module.exports = router;