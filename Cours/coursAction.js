// -- Load model needed for the project
const CoursProcess = require('./coursProcess');
const EtudiantProcess = require('../Etudiant/etudiantProcess');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Cours - FIND ALL");

    try{
        CoursProcess.processFindAll().then((callback) => {
            console.log("Process : Cours - FIND ALL : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - FIND ALL : Error - " + err);

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Cours - CREATE");

    try{
        CoursProcess.processCreate(req).then((callback) => {
            console.log("Process : Cours - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Cours - UPDATE");

    try{
        CoursProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Cours - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Cours - DELETE");

    try{
        CoursProcess.processDelete(req).then((callback) => {
            console.log("Process : Cours - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Cours - READ ID");
    
    try{
        CoursProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Cours - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - READ ID : Error - " + err);

        res.send(err);
    }
};

// -- READ ID BY CRITERE
function actionReadByCritere (req, res) {
    console.log("Action : Cours - READ ID BY CRITERE");
    
    try{
        CoursProcess.processReadByCritere(req.params.critere, req.params.variable).then((callback) => {
            console.log("Process : Cours - READ ID BY CRITERE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - READ ID BY CRITERE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE PRESENT
function actionUpdatePresent (req, res) {
    console.log("Action : Cours - UPDATE PRESENT");

    try{
        CoursProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Cours - UPDATE PRESENT : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - UPDATE PRESENT : Error - " + err);

        res.send(err);
    }
};

// -- ADD PRESENT BY ROLE
function actionAddPresentByRole (req, res) {
    console.log("Action : Cours - ADD PRESENT BY ROLE");

    try{
        if(req.params.role == "Etudiant"){
            EtudiantProcess.processRead(req.body.idEtudiant).then((callback) => {
                console.log("Process : Etudiant - READ ID : " + JSON.stringify(callback));
                
                if(req.body.presents == null){
                    req.body.presents = [];
                }
                req.body.presents.push(callback);
                actionUpdatePresent(req, res).then((callback) => {
                    console.log("Process : Cours - ADD PRESENT BY ROLE : " + JSON.stringify(callback));
        
                    res.send(callback);
                });
            });
        } else if(req.params.role == "Provisoire") {
            if(req.body.presentsProvisoire == null){
                req.body.presentsProvisoire = [];
            }

            req.body.presentsProvisoire.push({nom : req.body.nomdEtudiant, prenom : req.body.prenomEtudiant});

            actionUpdatePresent(req, res).then((callback) => {
                console.log("Process : Cours - ADD PRESENT PROVISOIRE BY ROLE : " + JSON.stringify(callback));
    
                res.send(callback);
            });
        } else {
            res.status(401).json({
                text: "Erreur",
                descritpion: "Role est incorrecte"
            });
        }
    } catch(err) {
        console.log("Process : Cours - ADD PRESENT BY ROLE : Error - " + err);

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionReadByCritere = actionReadByCritere;
exports.actionUpdatePresent = actionUpdatePresent;
exports.actionAddPresentByRole = actionAddPresentByRole;