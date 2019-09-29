const express = require('express');
const bodyParser = require('body-parser');

app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
const action = require('./professeurAction');

const lienCreate = '/create';

// -- CREATE
app.post(lienCreate, action.actionCreate);

module.exports = app;