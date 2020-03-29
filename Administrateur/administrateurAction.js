// -- Load model needed for the project
const AdministrateurProcess = require('./administrateurProcess');
const UtilisateurProcess = require('../Utilisateur/utilisateurProcess');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Administrateur - FIND ALL");

    try{
        AdministrateurProcess.processFindAll().then((callback) => {
            console.log("Process : Administrateur - FIND ALL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Administrateur - CREATE");

    try{ 
        AdministrateurProcess.processCreate(req).then((callback) => {
            console.log("Process : Administrateur - CREATE : " + callback);
            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Administrateur - UPDATE");

    try{
        AdministrateurProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Administrateur - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Administrateur - DELETE");

    try{
        AdministrateurProcess.processRead(req.params.id).then((professeur) => {
            console.log("Process : Administrateur - READ ID : " + JSON.stringify(professeur));

            UtilisateurProcess.processDelete(professeur.utilisateur._id).then((utilisateur) => {
                console.log("Process : Utilisateur - DELETE : " + JSON.stringify(utilisateur));

                AdministrateurProcess.processDelete(req.params.id).then((callback) => {
                    console.log("Process : Administrateur - DELETE : " + JSON.stringify(callback));
        
                    res.send(callback);
                });
            });

        });
    } catch(err) {
        console.log("Process : Administrateur - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Administrateur - READ ID");
    
    try{
        AdministrateurProcess.processReadByUserId(req.params.id).then((callback) => {
            console.log("Process : Administrateur - READ ID : " + JSON.stringify(callback));
            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Administrateur - READ ID : Error - " + err);
        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;