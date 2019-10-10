const mongoose = require('mongoose');
const Professeur = require("./professeurModel");

ObjectId = mongoose.Types.ObjectId;

// AUTHENTIFICATION CONNEXION
function checkAuth (req, res, next) {
    if (!req.body.login || !req.body.mdp) {
      //Le cas où login ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
        text: "Mot de passe vide ou login vide"
      });
    } else {
        Professeur.findOne({ login: req.body.login }, function(err, professeur) {
        if (err) {
          res.status(500).json({
            text: "Erreur interne"
          });
        } else if (!professeur) {
          res.status(401).json({
            text: "L'utilisateur n'existe pas"
          });
        } else {
          if (professeur.authenticate(req.body.mdp)) {
            console.log("connected");
            res.status(200).json({
              text: "Authentification réussi",
              prenom: professeur.prenom,
              nom: professeur.nom,
              id: professeur._id,
              token: professeur.getToken()
            });
          } else {
            console.log("not connected");
            res.status(401).json({
              text: "Mot de passe incorrect"
            });
          }
        }
      });
    }
};

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Professeur - FIND ALL");

  return await Professeur.find();
};

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Professeur - CREATE :" + req.body.nom);

    newProfesseur = new Professeur({numeroProfesseur:req.body.numeroProfesseur, nom:req.body.nom, prenom:req.body.prenom, mail:req.body.mail, login: req.body.login, mdp:mdp});

    return await newProfesseur.save();
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Professeur - UPDATE id : " + id);
    
    return await Professeur.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (req) {
    console.log("Process : Professeur - DELETE id : " + req.params.id);
    
    return await Professeur.find({_id : new ObjectId(req.params.id)}).deleteOne();
};

// -- READ ID
async function processRead (req) {
    console.log("Process : Professeur - READ id : " + new ObjectId(req.params.id));

    return await Professeur.findOne({_id : new ObjectId(req.params.id)});
};

exports.checkAuth = checkAuth;
exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;