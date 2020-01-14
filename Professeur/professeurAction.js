// -- Load model needed for the project
const ProfesseurProcess = require('./professeurProcess');
const UtilisateurProcess = require('../Utilisateur/utilisateurProcess');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Professeur - FIND ALL");

    try{
        ProfesseurProcess.processFindAll().then((callback) => {
            console.log("Process : Professeur - FIND ALL : " + JSON.stringify(callback));

/*             res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Tous les professeurs ont étés trouvés"
              }) */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - FIND ALL : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun professeur n'a été trouvé"
          }) */

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Professeur - CREATE");

    try{ 
        ProfesseurProcess.processCreate(req).then((callback) => {
            console.log("Process : Professeur - CREATE : " + callback);

/*             res.status(201).json({
                text: "Create",
                descritpion: "Le professeur a été créé"
              })  */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - CREATE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le professeur n'a pas été créé"
          }) */

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Professeur - UPDATE");

    try{
        ProfesseurProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Professeur - UPDATE : " + JSON.stringify(callback));

/*             res.status(201).json({
                text: "Update",
                descritpion: "Le professeur a été mise à jour"
              }) */ 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - UPDATE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le professeur n'a pas été mise à jour"
          }) */

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Professeur - DELETE");

    try{
        ProfesseurProcess.processRead(req.params.id).then((professeur) => {
            console.log("Process : Professeur - READ ID : " + JSON.stringify(professeur));

            UtilisateurProcess.processDelete(professeur.utilisateur._id).then((utilisateur) => {
                console.log("Process : Utilisateur - DELETE : " + JSON.stringify(utilisateur));

                ProfesseurProcess.processDelete(req.params.id).then((callback) => {
                    console.log("Process : Professeur - DELETE : " + JSON.stringify(callback));
        
/*                     res.status(200).json({
                        text: "Traitement Ok",
                        descritpion: "Le professeur a été supprimé"
                      }) */
        
                    res.send(callback);
                });
            });

        });
    } catch(err) {
        console.log("Process : Professeur - DELETE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le professeur n'a pas été supprimé"
          }) */

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Professeur - READ ID");
    
    try{
        ProfesseurProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Professeur - READ ID : " + JSON.stringify(callback));

/*             res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Le professeur a été trouvé"
              }) */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - READ ID : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le professeur n'a pas été trouvé"
          }) */

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;