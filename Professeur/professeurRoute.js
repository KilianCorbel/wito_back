const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const professeurAction = require('./professeurAction');

const lienAll = '/';
const lienCreate = '/';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';

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