// -- Load model needed for the project
const ProfesseurProcess = require('./professeurProcess');
const bcrypt = require('bcrypt');

// Connexion
function checkAuth (req, res, next) {
    ProfesseurProcess.checkAuth(req, res);
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Professeur - CREATE");

    try{        
        mdp = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.mdp, 10, async function (err, hash){
                console.log("Action : Professeur - hash : " + hash);
                resolve(hash);
            });
        })

        ProfesseurProcess.processCreate(req, mdp).then((callback) => {
            console.log("Process : Professeur - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Professeur - UPDATE");

    try{
        ProfesseurProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Professeur - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Professeur - DELETE");

    try{
        ProfesseurProcess.processDelete(req).then((callback) => {
            console.log("Process : Professeur - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Professeur - READ ID");
    
    try{
        ProfesseurProcess.processRead(req).then((callback) => {
            console.log("Process : Professeur - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - READ ID : Error - " + err);

        res.send(err);
    }
};

exports.checkAuth = checkAuth;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;