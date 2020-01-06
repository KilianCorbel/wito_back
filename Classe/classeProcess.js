const mongoose = require('mongoose');
const Classe = require("./classeModel");

ObjectId = mongoose.Types.ObjectId;

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Classe - FIND ALL");

  return await Classe.find();
};

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Classe - CREATE :" + req.body.nom);

    newClasse = new Classe({filiere:req.body.filiere, annee:req.body.annee, label:req.body.label});

    return await newClasse.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Classe - UPDATE id : " + id);
    
    return await Classe.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Classe - DELETE id : " + req.params.id);
    
    return await Classe.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ ID
async function processRead (id) {
    console.log("Process : Classe - READ id : " + new ObjectId(id));

    return await Classe.findOne({_id : new ObjectId(id)});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;