const mongoose = require('mongoose');

ObjectId = mongoose.Types.ObjectId;

// -- Load model needed for the project
require('./professeurModel');
Professeur = mongoose.model('Professeur');

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Professeur - CREATE :" + req.body.nom);

    newProfesseur = new Professeur({numeroProfesseur:req.body.numeroProfesseur, nom:req.body.nom, prenom:req.body.prenom, mail:req.body.mail, mdp:mdp});

    return await newProfesseur.save();
};

exports.processCreate = processCreate;