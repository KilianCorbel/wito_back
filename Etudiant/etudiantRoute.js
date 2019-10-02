const express = require('express');
//const router = express.Router();
const bodyParser = require('body-parser');

app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
const etudiantAction = require('./etudiantAction');

const lienConnection = "/login";
const lienCreate = '/create';

//--Connexion
app.post(lienConnection, etudiantAction.checkAuth);

// -- CREATE
app.post(lienCreate, etudiantAction.actionCreate);

module.exports = app;
