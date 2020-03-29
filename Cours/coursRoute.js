const express = require('express');
const router = express.Router();

// -- Load model needed for the project
const coursAction = require('./coursAction');

const lienAll = '/';
const lienCreate = '/';
const lienCreateIcs = '/ics';
const lienUpdate = '/:id';
const lienDelete = '/:id';
const lienGet = '/:id';
const lienGetByRole = '/:role/:id';
const lienAddPresentByRole = '/present/:id/:role';

// -- FIND ALL
router.get(lienAll, coursAction.actionFindAll);

// -- CREATE
router.post(lienCreate, coursAction.actionCreate);

// -- CREATE ICS
router.post(lienCreateIcs, coursAction.actionCreateIcs);

// -- UPDATE
router.put(lienUpdate, coursAction.actionUpdate);

// -- DELETE
router.delete(lienDelete, coursAction.actionDelete);

// -- READ ID
router.get(lienGet, coursAction.actionRead);

// -- READ BY ROLE
router.get(lienGetByRole, coursAction.actionReadByRole);

// -- ADD PRESENT BY ROLE
router.post(lienAddPresentByRole, coursAction.actionAddPresentByRole);

module.exports = router;