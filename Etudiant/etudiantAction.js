// -- Load model needed for the project
const EtudiantProcess = require('./etudiantProcess');
// const bcrypt = require('bcrypt');

// Connexion
function checkAuth (req, res, next) {
    EtudiantProcess.checkAuth(req, res);
};

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Etudiant - FIND ALL");

    try{
        EtudiantProcess.processFindAll().then((callback) => {
            console.log("Process : Etudiant - FIND ALL : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Toutes les etudiants ont ete trouvees"
              })

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - FIND ALL : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun etudiants n a ete trouve"
          })

        res.send(err);
    }
};

// -- FIND BY classe
function actionFindByClasse(req, res) {
    console.log("Action : Etudiant - FIND BY classe");

    try{
        EtudiantProcess.processFindByClasse(req).then((callback) => {
            console.log("Process : Etudiant - FIND BY classe : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Toutes les etudiants de la classe ont ete trouvees d"
              })

            res.send(callback);
        });
    }catch(err) {
        console.log("Process : Etudiant - FIND BY classe : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun etudiants de la classe n a ete trouve"
          })

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Etudiant - CREATE");

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

        EtudiantProcess.processCreate(req, mdp).then((callback) => {
            console.log("Process : Etudiant - CREATE : " + callback);

            res.status(201).json({
                text: "Create",
                descritpion: "L etudiant " +callback +" a ete cree"
              }) 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - CREATE : Error - " + err);
        
        res.status(400).json({
            text: "Erreur",
            descritpion: "L etudiant n a pas ete cree"
          })

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Etudiant - UPDATE");

    try{
        EtudiantProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Etudiant - UPDATE : " + JSON.stringify(callback));

            res.status(201).json({
                text: "Update",
                descritpion: "L etudiant " +callback +" a ete mise a jour"
              }) 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - UPDATE : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "L etudiant n a pas ete mise a jour"
          })

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Etudiant - DELETE");

    try{
        EtudiantProcess.processDelete(req).then((callback) => {
            console.log("Process : Etudiant - DELETE : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "L etudiant " + callback+" a ete supprimee"
              })

            res.send(callback);

        });
    } catch(err) {
        console.log("Process : Etudiant - DELETE : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "L etudiant "+ callback+" n a pas ete supprime"
          })

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Etudiant - READ ID");
    
    try{
        EtudiantProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Etudiant - READ ID : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "L etudiant " + callback+" a ete lu"
              })

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - READ ID : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "L etudiant "+ callback+" n a pas ete lu"
          })
        res.send(err);
    }
};

exports.checkAuth = checkAuth;
exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionFindByClasse = actionFindByClasse;