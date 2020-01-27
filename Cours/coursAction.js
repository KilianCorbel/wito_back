// -- Load model needed for the project
const CoursProcess = require('./coursProcess');
const EtudiantProcess = require('../Etudiant/etudiantProcess');
const ProfesseurProcess = require('../Professeur/professeurProcess');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Cours - FIND ALL");

    try{
        CoursProcess.processFindAll().then((callback) => {
            console.log("Process : Cours - FIND ALL : " + JSON.stringify(callback));
            
/*             res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Tous les cours ont étés trouvés"
              }) */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - FIND ALL : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun cours n'a été trouvé"
          }) */

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Cours - CREATE " + req.body.professeur);

    try{
        ProfesseurProcess.processReadByUserId(req.body.professeur).then((professeur) => {
            console.log("Process : Professeur - READ BY USER ID : " + JSON.stringify(professeur));
            req.body.professeur = professeur;
            CoursProcess.processCreate(req).then((callback) => {
                console.log("Process : Cours - CREATE : " + callback);

    /*             res.status(201).json({
                    text: "Create",
                    descritpion: "Le cours a été créé"
                })  */

                res.send(callback);
            });
        });
    } catch(err) {
        console.log("Process : Cours - CREATE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n'a pas été créé"
          }) */

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Cours - UPDATE");

    try{
        CoursProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Cours - UPDATE : " + JSON.stringify(callback));

/*             res.status(201).json({
                text: "Update",
                descritpion: "Le cours a été mise à jour"
              })  */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - UPDATE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n'a pas été mise à jour"
          }) */

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Cours - DELETE");

    try{
        CoursProcess.processDelete(req.params.id).then((callback) => {
            console.log("Process : Cours - DELETE : " + JSON.stringify(callback));

/*             res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Le cours a été supprimé"
              }) */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - DELETE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n'a pas été mise à jour"
          }) */

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Cours - READ ID");
    
    try{
        CoursProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Cours - READ ID : " + JSON.stringify(callback));

/*             res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Le cours a été trouvé"
              }) */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - READ ID : Error - " + err);
        
/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n'a pas été trouvé"
          }) */

        res.send(err);
    }
};

// -- READ BY ROLE
function actionReadByRole (req, res) {
    console.log("Action : Cours - READ BY ROLE");
    console.log(req.params.role);
    console.log(req.params.id);
    
    try{
        if(req.params.role == "professeur"){
            ProfesseurProcess.processReadByUserId(req.params.id).then((professeur) => {
                console.log("Process : Professeur - READ ID : " + JSON.stringify(professeur));
                
                CoursProcess.processReadByProfesseurId(professeur._id).then((callback) => {
                    console.log("Process : Cours - READ BY PROFESSEUR ID : " + JSON.stringify(callback));
        
/*                     res.status(201).json({
                        res: callback,
                        text: "Traitement Ok",
                        descritpion: "Les cours du role " + req.params.role + " ont bien étés trouvés"
                      }) */
        
                    res.send(callback);
                });
            });
        } else if(req.params.role == "etudiant"){
            EtudiantProcess.processReadByUserId(req.params.id).then((etudiant) => {
                console.log("Process : Etudiant - READ ID : " + JSON.stringify(etudiant));
                
                CoursProcess.processReadByClasse(etudiant.classe._id).then((callback) => {
                    console.log("Process : Cours - READ BY CLASSE : " + JSON.stringify(callback));
        
/*                     res.status(201).json({
                        text: "Traitement Ok",
                        descritpion: "Les cours du role " + req.params.role + " ont bien étés trouvés"
                      }) */
        
                    res.send(callback);
                });
            });
        } else {
/*             res.status(400).json({
                text: "Erreur",
                descritpion: "Le role est incorrecte"
              }) 
    
    */
            res.send(err);
        }
    } catch(err) {
        console.log("Process : Cours - READ ID BY CRITERE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n'a pas été trouvé"
          }) */


        res.send(err);
    }
};

// -- UPDATE PRESENT
function actionUpdatePresent (req, res) {
    console.log("Action : Cours - UPDATE PRESENT");

    try{
        CoursProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Cours - UPDATE PRESENT : " + JSON.stringify(callback));

/*             res.status(201).json({
                text: "Traitement Ok",
                descritpion: "Le cours a été mis à jour"
              }) */

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - UPDATE PRESENT : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n'a pas été mise à jour"
          }) */


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

/*                     res.status(201).json({
                        text: "Traitement Ok",
                        descritpion: "Un étudiant a été ajouté dans le cours"
                    }) */

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
                
/*                 res.status(201).json({
                    text: "Traitement Ok",
                    descritpion: "Un étudiant provisoire a été ajouté dans le cours"
                }) */

                res.send(callback);
            });
        } else {
/*             res.status(401).json({
                text: "Erreur",
                descritpion: "Le role est incorrecte"
            }); */
        }
    } catch(err) {
        console.log("Process : Cours - ADD PRESENT BY ROLE : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun étudiant n'a été ajouté dans le cours"
          }) */

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;
exports.actionReadByRole = actionReadByRole;
exports.actionUpdatePresent = actionUpdatePresent;
exports.actionAddPresentByRole = actionAddPresentByRole;