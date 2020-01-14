const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const utilisateurAction = require('./utilisateurAction');

const lienConnection = "/auth";
const lienAll = '/';
const lienCreate = '/';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';

//--Connexion
router.post(lienConnection, utilisateurAction.checkAuth);

// -- FIND ALL
router.get(lienAll, utilisateurAction.actionFindAll);

// -- CREATE
router.post(lienCreate, utilisateurAction.actionCreate);

// -- UPDATE
router.put(lienUpdate, utilisateurAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, utilisateurAction.actionDelete);

// -- READ ID
router.get(lienGet, utilisateurAction.actionRead);

module.exports = router;