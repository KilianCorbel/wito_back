const mongoose = require('mongoose');
const Etudiant = require("./etudiantModel");

ObjectId = mongoose.Types.ObjectId;

// AUTHENTIFICATION CONNEXION
function checkAuth (req, res, next) {
    if (!req.body.login || !req.body.mdp) {
      //Le cas où login ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
        text: "Erreur",
        descritpion: "Mot de passe vide ou login vide"
      });
    } else {
        Etudiant.findOne({ login: req.body.login }, function(err, etudiant) {
        if (err) {
          res.status(500).json({
            text: "Erreur",
            descritpion: "Erreur interne"
          });
        } else if (!etudiant) {
          res.status(401).json({
            text: "Erreur",
            descritpion: "L'utilisateur n'existe pas"
          });
        } else {
          if (etudiant.authenticate(req.body.mdp)) {
            console.log("connected");
            res.status(200).json({
              text: "Authentification réussi",
              prenom: etudiant.prenom,
              nom: etudiant.nom,
              id: etudiant._id,
              token: etudiant.getToken()
            });
          } else {
            console.log("not connected");
            res.status(401).json({
              text: "Erreur",
              descritpion: "Mot de passe incorrect"
            });
          }
        }
      });
    }
};

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Etudiant - FIND ALL");

  return await Etudiant.find();
};

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Etudiant - CREATE :" + req.body.nom);

    newEtudiant = new Etudiant({numeroEtudiant:req.body.numeroEtudiant, nom:req.body.nom, prenom:req.body.prenom, mail:req.body.mail, login: req.body.login, mdp:mdp});

    return await newEtudiant.save();
};

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Etudiant - CREATE :" + req.body.nom);

    newEtudiant = new Etudiant({numeroEtudiant:req.body.numeroEtudiant, nom:req.body.nom, prenom:req.body.prenom, mail:req.body.mail, login: req.body.login, mdp:mdp});

    return await newEtudiant.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Etudiant - UPDATE id : " + id);
    
    return await Etudiant.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Etudiant - DELETE id : " + req.params.id);
    
    return await Etudiant.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Etudiant - READ id : " + new ObjectId(req.params.id));

    return await Etudiant.findOne({_id : new ObjectId(req.params.id)});
};

exports.checkAuth = checkAuth;
exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;