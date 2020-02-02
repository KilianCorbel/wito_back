const mongoose = require('mongoose');
const Administrateur = require("./administrateurModel");

ObjectId = mongoose.Types.ObjectId;

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Administrateur - FIND ALL");

  return await Administrateur.find().populate('utilisateur');
};

// -- CREATE
async function processCreate (req) {
    console.log("Process : Administrateur - CREATE :" + req.body.utilisateur);
 
    newAdministrateur = new Administrateur({mail:req.body.mail, utilisateur:req.body.utilisateur});

    return await newAdministrateur.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Administrateur - UPDATE id : " + id);

    return await Administrateur.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (id) {
    console.log("Process : Administrateur - DELETE id : " + id);

    return await Administrateur.find({_id : new ObjectId(id)}).deleteOne();
};

// -- READ ID
async function processRead (id) {
    console.log("Process : Administrateur - READ id : " + new ObjectId(id));

    return await Administrateur.findOne({_id : new ObjectId(id)}).populate('utilisateur');
};

// -- READ BY USER ID
async function processReadByUserId (id) {
    console.log("Process : Administrateur - READ BY USER ID : " + new ObjectId(id));

    return await Administrateur.findOne({utilisateur:{ _id: new ObjectId(id) }}).populate('utilisateur');
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadByUserId = processReadByUserId;