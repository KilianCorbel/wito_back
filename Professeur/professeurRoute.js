const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const professeurAction = require('./professeurAction');

const lienConnection = "/login";
const lienAll = '/';
const lienCreate = '/create';
const lienUpdate = '/update/:id';
const lienDelete = '/delete/:id';
const lienGet = '/get/:id';

//--Connexion
router.post(lienConnection, professeurAction.checkAuth);

// -- FIND ALL
router.get(lienAll, professeurAction.actionFindAll);

// -- CREATE
router.post(lienCreate, professeurAction.actionCreate);

// -- UPDATE
router.put(lienUpdate, professeurAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, professeurAction.actionDelete);

// -- READ ID
router.get(lienGet, professeurAction.actionRead);

module.exports = router;