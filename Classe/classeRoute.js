const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const classeAction = require('./classeAction');

const lienAll = '/';
const lienCreate = '/';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';

// -- FIND ALL
router.get(lienAll, classeAction.actionFindAll);

// -- CREATE
router.post(lienCreate, classeAction.actionCreate);

// -- UPDATE
router.put(lienUpdate, classeAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, classeAction.actionDelete);

// -- READ ID
router.get(lienGet, classeAction.actionRead);

module.exports = router;