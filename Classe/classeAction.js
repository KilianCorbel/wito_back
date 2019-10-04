// -- Load model needed for the project
const ClasseProcess = require('./classeProcess');
let auth = module.exports;

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Classe - CREATE");

    try{
        ClasseProcess.processCreate(req).then((callback) => {
            console.log("Process : Classe - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - CREATE : Error - " + err);

        res.send(err);
    }
};

// -- UPDATE
function actionUpdate (req, res) {
    console.log("Action : Classe - UPDATE");

    try{
        ClasseProcess.processUpdate(req.params.id, req.body).then((callback) => {
            console.log("Process : Classe - UPDATE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - UPDATE : Error - " + err);

        res.send(err);
    }
};

// -- DELETE
function actionDelete (req, res) {
    console.log("Action : Classe - DELETE");

    try{
        ClasseProcess.processDelete(req).then((callback) => {
            console.log("Process : Classe - DELETE : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - DELETE : Error - " + err);

        res.send(err);
    }
};

// -- READ ID
function actionRead (req, res) {
    console.log("Action : Classe - READ ID");
    
    try{
        ClasseProcess.processRead(req).then((callback) => {
            console.log("Process : Classe - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Classe - READ ID : Error - " + err);

        res.send(err);
    }
};

exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;