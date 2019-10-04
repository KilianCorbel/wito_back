// -- Load model needed for the project
const EtudiantProcess = require('./etudiantProcess');
const bcrypt = require('bcrypt');

// Connexion
function checkAuth (req, res, next) {
    EtudiantProcess.checkAuth(req, res);
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Etudiant - CREATE");

    try{        
        mdp = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.mdp, 10, async function (err, hash){
                console.log("Action : Etudiant - hash : " + hash);
                resolve(hash);
            });
        })

        EtudiantProcess.processCreate(req, mdp).then((callback) => {
            console.log("Process : Etudiant - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Etudiant - CREATE : Error - " + err);

        res.send(err);
    }
};

exports.checkAuth = checkAuth;
exports.actionCreate = actionCreate;
