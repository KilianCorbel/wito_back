// -- Load model needed for the project
const EtudiantProcess = require('./etudiantProcess');
const bcrypt = require('bcrypt');
let auth = module.exports;

// Connexion
auth.checkAuth = function(req, res, next) {
    EtudiantProcess.checkAuth(req, res);
};

// -- CREATE
auth.actionCreate = async function(req, res) {
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
