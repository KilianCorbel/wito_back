const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const etudiantAction = require('./etudiantAction');

const lienAll = '/';
const lienCreate = '/';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';
const lienGetByClasse = "/classe/:id"

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

// -- FIND BY classe
router.get(lienGetByClasse, etudiantAction.actionFindByClasse);

module.exports = router;