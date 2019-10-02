const express = require('express');
//const router = express.Router();
const bodyParser = require('body-parser');

app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
const professeurAction = require('./professeurAction');

const lienConnection = "/login";
const lienCreate = '/create';

//--Connexion
app.post(lienConnection, professeurAction.checkAuth);

// -- CREATE
app.post(lienCreate, professeurAction.actionCreate);

module.exports = app;
