const mongoose = require('mongoose');
const Etudiant = require("./etudiantModel");

ObjectId = mongoose.Types.ObjectId;

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Etudiant - FIND ALL");

  return await Etudiant.find().populate('utilisateur').populate('classe');
};

// -- FIND BY CLASSE
async function processFindByClasse(req) {
  console.log("Process : Etudiant - FIND by classe : " + new ObjectId(req.params.id));

  return await Etudiant.find({classe :{ _id: new ObjectId(req.params.id) }}).populate('utilisateur').populate('classe');
};

// -- FIND INSCRITS
async function processFindInscrits () {
    console.log("Process : Etudiant - FIND INSCRITS");
  
    return await Etudiant.find().populate('utilisateur');
    //return await Etudiant.find({utilisateur:{ role: 'inscrit' }}).populate('utilisateur').populate('classe');
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Etudiant - CREATE :" + req.body.utilisateur);

    newEtudiant = new Etudiant({mail:req.body.mail, utilisateur:req.body.utilisateur});

    return await newEtudiant.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Etudiant - UPDATE id : " + id);
    
    return await Etudiant.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (id) {
    console.log("Process : Etudiant - DELETE id : " + id);
    
    return await Etudiant.find({_id : new ObjectId(id)}).deleteOne();
};

// -- READ ID
async function processRead (id) {
    console.log("Process : Etudiant - READ id : " + new ObjectId(id));

    return await Etudiant.findOne({_id : new ObjectId(id)}).populate('utilisateur').populate('classe');
};

// -- READ BY USER ID
async function processReadByUserId (id) {
    console.log("Process : Etudiant - READ BY USER ID : " + new ObjectId(id));

    return await Etudiant.findOne({utilisateur:{ _id: new ObjectId(id) }}).populate('utilisateur').populate('classe');
};

exports.processFindAll = processFindAll;
exports.processFindByClasse = processFindByClasse;
exports.processFindInscrits = processFindInscrits;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadByUserId = processReadByUserId;