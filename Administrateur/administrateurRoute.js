const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const administrateurAction = require('./administrateurAction');

const lienAll = '/';
const lienCreate = '/';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';

// -- FIND ALL
router.get(lienAll, administrateurAction.actionFindAll);

// -- CREATE
router.post(lienCreate, administrateurAction.actionCreate);

// -- UPDATE
router.put(lienUpdate, administrateurAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, administrateurAction.actionDelete);

// -- READ ID
router.get(lienGet, administrateurAction.actionRead);

module.exports = router;