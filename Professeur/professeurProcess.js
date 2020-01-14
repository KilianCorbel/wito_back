const mongoose = require('mongoose');
const Professeur = require("./professeurModel");

ObjectId = mongoose.Types.ObjectId;

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Professeur - FIND ALL");

  return await Professeur.find().populate('utilisateur');
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Professeur - CREATE :" + req.body.utilisateur);
 
    newProfesseur = new Professeur({mail:req.body.mail, utilisateur:req.body.utilisateur});

    return await newProfesseur.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Professeur - UPDATE id : " + id);

    return await Professeur.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (id) {
    console.log("Process : Professeur - DELETE id : " + id);

    return await Professeur.find({_id : new ObjectId(id)}).deleteOne();
};

// -- READ ID
async function processRead (id) {
    console.log("Process : Professeur - READ id : " + new ObjectId(id));

    return await Professeur.findOne({_id : new ObjectId(id)}).populate('utilisateur');
};

// -- READ BY USER ID
async function processReadByUserId (id) {
    console.log("Process : Professeur - READ BY USER ID : " + new ObjectId(id));

    return await Professeur.findOne({utilisateur:{ _id: new ObjectId(id) }}).populate('utilisateur');
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadByUserId = processReadByUserId;