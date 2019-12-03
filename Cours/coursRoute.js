const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const coursAction = require('./coursAction');

const lienAll = '/';
const lienCreate = '/';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';
const lienPresent = '/present/:id';

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

// -- UPDATE PRESENT
router.get(lienPresent, coursAction.actionUpdatePresent);

module.exports = router;