const mongoose = require('mongoose');
const Cours = require("./coursModel");

ObjectId = mongoose.Types.ObjectId;

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Cours - CREATE :" + req.body.nom);

    newCours = new Cours({idCours:req.body.idCours, nom:req.body.nom, heureD:req.body.heureD, heureF:req.body.heureF, date: req.body.date, salle:req.body.salle});

    return await newCours.save();
};

exports.processCreate = processCreate;