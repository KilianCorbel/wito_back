// -- Load model needed for the project
const ClasseProcess = require('./classeProcess');

// -- FIND ALL
function actionFindAll (req, res) {
    console.log("Action : Classe - FIND ALL");

    try{
        ClasseProcess.processFindAll().then((callback) => {
            console.log("Process : Classe - FIND ALL : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "Toutes les classes ont ete trouvees"
              })

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - FIND ALL : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "Aucune classe n a ete trouve"
          })

        res.send(err);
    }
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Classe - CREATE");

    try{
        ClasseProcess.processCreate(req).then((callback) => {
            console.log("Process : Classe - CREATE : " + callback);

            res.status(201).json({
                text: "Create",
                descritpion: "La classe " +callback +" a ete cree"
              }) 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - CREATE : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "La classe n a pas ete cree"
          })

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Classe - UPDATE");

    try{
        ClasseProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Classe - UPDATE : " + JSON.stringify(callback));
            
            res.status(201).json({
                text: "Update",
                descritpion: "La classe " +callback +" a ete mise a jour"
              }) 

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - UPDATE : Error - " + err);
        
        res.status(400).json({
            text: "Erreur",
            descritpion: "La classe n a pas ete mise a jour"
          })

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Classe - DELETE");

    try{
        ClasseProcess.processDelete(req).then((callback) => {
            console.log("Process : Classe - DELETE : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "La classe " + callback+" a ete supprimee"
              })


            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - DELETE : Error - " + err);
         
        res.status(400).json({
            text: "Erreur",
            descritpion: "La classe "+ callback+" n a pas ete mise a jour"
          })

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Classe - READ ID");
    
    try{
        ClasseProcess.processRead(req.params.id).then((callback) => {
            console.log("Process : Classe - READ ID : " + JSON.stringify(callback));

            res.status(200).json({
                text: "Traitement Ok",
                descritpion: "La classe " + callback+" a ete lu"
              })


            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - READ ID : Error - " + err);

        res.status(400).json({
            text: "Erreur",
            descritpion: "La classe "+ callback+" n a pas ete lu"
          })

        res.send(err);
    }
};

exports.actionFindAll = actionFindAll;
exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;