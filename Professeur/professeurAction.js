// -- Load model needed for the project
const ProfesseurProcess = require('./professeurProcess');
const bcrypt = require('bcrypt');
let auth = module.exports;

// Connexion
auth.checkAuth = function(req, res, next) {
    ProfesseurProcess.checkAuth(req, res);
};

// -- CREATE
auth.actionCreate = async function(req, res) {
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
