// -- Load model needed for the project
const EtudiantProcess = require('./etudiantProcess');
const UtilisateurProcess = require('../Utilisateur/utilisateurProcess');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Etudiant - FIND ALL");

    try{
        EtudiantProcess.processFindAll().then((callback) => {
            console.log("Process : Etudiant - FIND ALL : " + JSON.stringify(callback));

/*            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Tous les étudiants ont étés trouvés"
              })
*/
            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - FIND ALL : Error - " + err);

 /*       res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun étudiant n'a été trouvé"
          })
*/
        res.send(err);
    }
};

// -- FIND BY classe
function actionFindByClasse(req, res) {
    console.log("Action : Etudiant - FIND BY classe");

    try{
        EtudiantProcess.processFindByClasse(req).then((callback) => {
            console.log("Process : Etudiant - FIND BY classe : " + JSON.stringify(callback));

/*            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Tous les étudiants de la classe ont étés trouvés"
              })
*/
            res.send(callback);
        });
    }catch(err) {
        console.log("Process : Etudiant - FIND BY classe : Error - " + err);

     /*   res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun étudiant de la classe n'a été trouvé"
          })
*/
        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Etudiant - CREATE");

    try{ 
        EtudiantProcess.processCreate(req).then((callback) => {
            console.log("Process : Etudiant - CREATE : " + callback);

/*             res.status(201).json({
                text: "Create",
                descritpion: "L'étudiant a été créé"
              })  */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - CREATE : Error - " + err);
        
/*         res.status(400).json({
            text: "Erreur",
            descritpion: "L'étudiant n'a pas été créé"
          }) */

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Etudiant - UPDATE");

    try{
        EtudiantProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Etudiant - UPDATE : " + JSON.stringify(callback));

/*             res.status(201).json({
                text: "Update",
                descritpion: "L'étudiant a été mise à jour"
              }) */ 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - UPDATE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "L'étudiant n'a pas été mise à jour"
          }) */

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Etudiant - DELETE");

    try{
        EtudiantProcess.processRead(req.params.id).then((etudiant) => {
            console.log("Process : Etudiant - READ ID : " + JSON.stringify(etudiant));

            UtilisateurProcess.processDelete(etudiant.utilisateur._id).then((utilisateur) => {
                console.log("Process : Utilisateur - DELETE : " + JSON.stringify(utilisateur));

                EtudiantProcess.processDelete(req.params.id).then((callback) => {
                    console.log("Process : Etudiant - DELETE : " + JSON.stringify(callback));
        
/*                     res.status(200).json({
                        text: "Traitement Ok",
                        descritpion: "L'étudiant a été supprimé"
                      }) */
        
                    res.send(callback);
                });
            });

        });
    } catch(err) {
        console.log("Process : Etudiant - DELETE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "L etudiant n a pas ete supprime"
          }) */

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Etudiant - READ ID");
    
    try{
        EtudiantProcess.processReadByUserId(req.params.id).then((callback) => {
            console.log("Process : Etudiant - READ ID : " + JSON.stringify(callback));

/*             res.status(200).json({
                text: "Traitement Ok",
                descritpion: "L etudiant a ete trouve"
              }) */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - READ ID : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "L etudiant "+ callback+" n a pas ete trouve"
          }) */
        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionFindByClasse = actionFindByClasse;