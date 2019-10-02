const mongoose = require('mongoose');
const auth = module.exports;
const Cours = require("./coursModel");

ObjectId = mongoose.Types.ObjectId;

// -- CREATE
auth.processCreate = async function(req, mdp) {
    console.log("Process : Cours - CREATE :" + req.body.nom);

    newCours = new Cours({idCours:req.body.idCours, nom:req.body.nom, heureD:req.body.heureD, heureF:req.body.heureF, date: req.body.date, salle:req.body.salle});

    return await newCours.save();
};