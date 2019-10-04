const mongoose = require('mongoose');
const Etudiant = require("./etudiantModel");

ObjectId = mongoose.Types.ObjectId;

// AUTHENTIFICATION CONNEXION
function checkAuth (req, res, next) {
    if (!req.body.login || !req.body.mdp) {
      //Le cas où login ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
        text: "Mot de passe vide ou login vide"
      });
    } else {
        Etudiant.findOne({ login: req.body.login }, function(err, etudiant) {
        if (err) {
          res.status(500).json({
            text: "Erreur interne"
          });
        } else if (!etudiant) {
          res.status(401).json({
            text: "L'utilisateur n'existe pas"
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
              text: "Mot de passe incorrect"
            });
          }
        }
      });
    }
};

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Etudiant - CREATE :" + req.body.nom);

    newEtudiant = new Etudiant({numeroEtudiant:req.body.numeroEtudiant, nom:req.body.nom, prenom:req.body.prenom, mail:req.body.mail, login: req.body.login, mdp:mdp});

    return await newEtudiant.save();
};

exports.checkAuth = checkAuth;
exports.processCreate = processCreate;
