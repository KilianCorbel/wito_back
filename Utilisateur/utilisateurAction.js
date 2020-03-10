// -- Load model needed for the project
const UtilisateurProcess = require('./utilisateurProcess');
const ProfesseurProcess = require('../Professeur/professeurProcess');
const EtudiantProcess = require('../Etudiant/etudiantProcess');
// const bcrypt = require('bcrypt');

// Connexion
function checkAuth (req, res, next) {
    UtilisateurProcess.checkAuth(req, res);
};

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Utilisateur - FIND ALL");

    try{
        UtilisateurProcess.processFindAll().then((callback) => {
            console.log("Process : Utilisateur - FIND ALL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Utilisateur - CREATE");

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

        UtilisateurProcess.processCreate(req, mdp).then((callback) => {
            console.log("Process : Utilisateur - CREATE : " + callback);

            req.body = {
                mail:callback.mail, 
                utilisateur:callback
            };

            if(callback.role == "professeur") {
                ProfesseurProcess.processCreate(req).then((professeur) => {
                    console.log("Process : Professeur - CREATE : " + professeur);
                });
            } else if (callback.role == "etudiant" || callback.role == "inscrit") {
                EtudiantProcess.processCreate(req).then((etudiant) => {
                    console.log("Process : Etudiant - CREATE : " + etudiant);
                });
            }

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Utilisateur - UPDATE");

    try{
        UtilisateurProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Utilisateur - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Utilisateur - DELETE");

    try{
        UtilisateurProcess.processDelete(req.params.id).then((callback) => {
            console.log("Process : Utilisateur - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Utilisateur - READ ID");
    
    try{
        UtilisateurProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Utilisateur - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Utilisateur - READ ID : Error - " + err);

        res.send(err);
    }
};

exports.checkAuth = checkAuth;
exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;