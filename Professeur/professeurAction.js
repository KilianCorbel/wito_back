// -- Load model needed for the project
const process = require('./professeurProcess');
const bcrypt = require('bcrypt');

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

        process.processCreate(req, mdp).then((callback) => {
            console.log("Process : Professeur - CREATE : " + callback);

            res.send(callback);
        });
    } catch(err) {
        console.log("Process : Professeur - CREATE : Error - " + err);

        res.send(err);
    }
};

exports.actionCreate = actionCreate;