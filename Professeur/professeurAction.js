// -- Load model needed for the project
const ProfesseurProcess = require('./professeurProcess');
// const bcrypt = require('bcrypt');

// Connexion
function checkAuth (req, res, next) {
    ProfesseurProcess.checkAuth(req, res);
};

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Professeur - FIND ALL");

    try{
        ProfesseurProcess.processFindAll().then((callback) => {
            console.log("Process : Professeur - FIND ALL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Professeur - CREATE");

    try{ 
        /*       
        mdp = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.mdp, 10, async function (err, hash){
                console.log("Action : Etudiant - hash : " + hash);
                resolve(hash);
            });
        })
        */
        mdp = req.body.mdp;

        ProfesseurProcess.processCreate(req, mdp).then((callback) => {
            console.log("Process : Professeur - CREATE : " + callback);

            if(callback.name){
                console.log("Process : Professeur - CREATE name : " + callback.name);
            }

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
        ProfesseurProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Professeur - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - READ ID : Error - " + err);

        res.send(err);
    }
};

exports.checkAuth = checkAuth;
exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;