// -- Load model needed for the project
const ProfesseurProcess = require('./professeurProcess');
const bcrypt = require('bcrypt');

// Connexion
function checkAuth (req, res, next) {
    ProfesseurProcess.checkAuth(req, res);
};

// -- CREATE
async function actionCreate (req, res) {
    console.log("Action : Professeur - CREATE");

    try{        
        mdp = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.mdp, 10, async function (err, hash){
                console.log("Action : Professeur - hash : " + hash);
                resolve(hash);
            });
        })

        ProfesseurProcess.processCreate(req, mdp).then((callback) => {
            console.log("Process : Professeur - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - CREATE : Error - " + err);

        res.send(err);
    }
};

exports.checkAuth = checkAuth;
exports.actionCreate = actionCreate;
