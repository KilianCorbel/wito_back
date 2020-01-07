// -- Load model needed for the project
const CoursProcess = require('./coursProcess');
const EtudiantProcess = require('../Etudiant/etudiantProcess');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Cours - FIND ALL");

    try{
        CoursProcess.processFindAll().then((callback) => {
            console.log("Process : Cours - FIND ALL : " + JSON.stringify(callback));
            
            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Tous les cours ont ete trouvees"
              })

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - FIND ALL : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Aucun cours n a ete trouve"
          })

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Cours - CREATE");

    try{
        CoursProcess.processCreate(req).then((callback) => {
            console.log("Process : Cours - CREATE : " + callback);

            res.status(201).json({
                text: "Create",
                descritpion: "Le cours " +callback +" a ete cree"
              }) 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - CREATE : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n a pas ete cree"
          })

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Cours - UPDATE");

    try{
        CoursProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Cours - UPDATE : " + JSON.stringify(callback));

            res.status(201).json({
                text: "Update",
                descritpion: "Le cours " +callback +" a ete mise a jour"
              }) 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - UPDATE : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours n a pas ete mise a jour"
          })

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Cours - DELETE");

    try{
        CoursProcess.processDelete(req).then((callback) => {
            console.log("Process : Cours - DELETE : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Le cours " + callback+" a ete supprimee"
              })

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - DELETE : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours "+ callback+" n a pas ete mise a jour"
          })

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Cours - READ ID");
    
    try{
        CoursProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Cours - READ ID : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Le cours " + callback+" a ete lu"
              })

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - READ ID : Error - " + err);
        
        res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours "+ callback+" n a pas ete lu"
          })

        res.send(err);
    }
};

// -- READ ID BY CRITERE
function actionReadByCritere (req, res) {
    console.log("Action : Cours - READ ID BY CRITERE");
    
    try{
        CoursProcess.processReadByCritere(req.params.critere, req.params.variable).then((callback) => {
            console.log("Process : Cours - READ ID BY CRITERE : " + JSON.stringify(callback));
            
            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Le cours " + callback+" a ete lu en fonction de l ID"
              })


            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - READ ID BY CRITERE : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours "+ callback+" n a pas ete lu par ID"
          })


        res.send(err);
    }
};

// -- UPDATE PRESENT
function actionUpdatePresent (req, res) {
    console.log("Action : Cours - UPDATE PRESENT");

    try{
        CoursProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Cours - UPDATE PRESENT : " + JSON.stringify(callback));

            res.status(201).json({
                text: "Traitement Ok",
                descritpion: "Le cours " + callback+" a ete mis a jour en fonction des presents"
              })

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - UPDATE PRESENT : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours "+ callback+" n a pas ete mise a jour"
          })


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
                    
                    res.status(200).json({
                        text: "Traitement Ok",
                        descritpion: "Le cours " + callback+" a ete lu en fonction du role 'etudiant'"
                    })

                }
                req.body.presents.push(callback);
                actionUpdatePresent(req, res).then((callback) => {
                    console.log("Process : Cours - ADD PRESENT BY ROLE : " + JSON.stringify(callback));

                    res.status(201).json({
                        text: "Traitement Ok",
                        descritpion: "Le cours " + callback+" a ete Update en fonction de la presence de l etudiant"
                    })

                    res.send(callback);
                });
            });
        } else if(req.params.role == "Provisoire") {
            if(req.body.presentsProvisoire == null){
                req.body.presentsProvisoire = [];

                res.status(200).json({
                    text: "Traitement Ok",
                    descritpion: "Le cours " + callback+" a ete lu en fonction du role 'provisoire'"
                })

            }

            req.body.presentsProvisoire.push({nom : req.body.nomdEtudiant, prenom : req.body.prenomEtudiant});

            actionUpdatePresent(req, res).then((callback) => {
                console.log("Process : Cours - ADD PRESENT PROVISOIRE BY ROLE : " + JSON.stringify(callback));
                
                res.status(201).json({
                    text: "Traitement Ok",
                    descritpion: "Le cours " + callback+" a ete update en fonction de la presence du provisoire"
                })

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

        res.status(400).json({
            text: "Erreur",
            descritpion: "Le cours "+ callback+" n a pas ete mise a jour en fonction du role"
          })

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