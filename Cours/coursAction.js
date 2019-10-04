// -- Load model needed for the project
const CoursProcess = require('./coursProcess');
let auth = module.exports;

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
        CoursProcess.processRead(req).then((callback) => {
            console.log("Process : Cours - READ ID : " + JSON.stringify(callback));

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Cours - READ ID : Error - " + err);

        res.send(err);
    }
};

exports.actionCreate = actionCreate;
exports.actionUpdate = actionUpdate;
exports.actionDelete = actionDelete;
exports.actionRead = actionRead;