// -- Load model needed for the project
const EtudiantProcess = require('./etudiantProcess');
const bcrypt = require('bcrypt');

// Connexion
function checkAuth (req, res, next) {
    EtudiantProcess.checkAuth(req, res);
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Etudiant - CREATE");

    try{        
        mdp = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.mdp, 10, async function (err, hash){
                console.log("Action : Etudiant - hash : " + hash);
                resolve(hash);
            });
        })

        EtudiantProcess.processCreate(req, mdp).then((callback) => {
            console.log("Process : Etudiant - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Etudiant - UPDATE");

    try{
        EtudiantProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Etudiant - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Etudiant - DELETE");

    try{
        EtudiantProcess.processDelete(req).then((callback) => {
            console.log("Process : Etudiant - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Etudiant - READ ID");
    
    try{
        EtudiantProcess.processRead(req).then((callback) => {
            console.log("Process : Etudiant - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - READ ID : Error - " + err);

        res.send(err);
    }
};

exports.checkAuth = checkAuth;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;