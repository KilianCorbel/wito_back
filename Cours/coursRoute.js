const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const coursAction = require('./coursAction');

const lienAll = '/';
const lienCreate = '/create';
const lienUpdate = '/update/:id';
const lienDelete = '/delete/:id';
const lienGet = '/get/:id';

// -- FIND ALL
router.get(lienAll, coursAction.actionFindAll);

// -- CREATE
router.post(lienCreate, coursAction.actionCreate);

// -- UPDATE
router.put(lienUpdate, coursAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, coursAction.actionDelete);

// -- READ ID
router.get(lienGet, coursAction.actionRead);

module.exports = router;