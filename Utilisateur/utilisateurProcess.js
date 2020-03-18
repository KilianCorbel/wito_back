const mongoose = require('mongoose');
const Utilisateur = require("./utilisateurModel");

ObjectId = mongoose.Types.ObjectId;

// AUTHENTIFICATION CONNEXION
function checkAuth (req, res, next) {
    if (!req.body.mail || !req.body.mdp) {
      //Le cas où login ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
        text: "Erreur",
        descritpion: "Mot de passe ou email incorrecte"
      });
    } else {
        Utilisateur.findOne({ mail: req.body.mail }, function(err, utilisateur) {
        if (err) {
          res.status(500).json({
            text: "Erreur",
            descritpion: "Erreur interne"
          });
        } else if (!utilisateur) {
          res.status(401).json({
            text: "Erreur",
            descritpion: "L'utilisateur n'existe pas"
          });
        // } else if(utilisateur.role === "inscrit") {
        //   res.status(401).json({
        //     text: "Erreur",
        //     descritpion: "Cet étudiant n'est pas encore valide"
        //   });
        } else {
          if (utilisateur.authenticate(req.body.mdp)) {
            console.log("connected");
            res.status(200).json({
              text: "Authentification réussi",
              prenom: utilisateur.prenom,
              nom: utilisateur.nom,
              id: utilisateur._id,
              role: utilisateur.role,
              token: utilisateur.getToken()
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
  console.log("Process : Utilisateur - FIND ALL");

  try{
    return await Utilisateur.find();
  } catch(err) {
    console.log("Process : Utilisateur - FIND ALL : Error - " + err.name);

    return err;
  }
};

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Utilisateur - CREATE :" + req.body.nom);

    try{  
      newUtilisateur = new Utilisateur({nom:req.body.nom, prenom:req.body.prenom, mail:req.body.mail, mdp:mdp, role:req.body.role});

      return await newUtilisateur.save();
    } catch(err) {
      console.log("Process : Utilisateur - CREATE : Error - " + err.name);

      return err;
    }
};

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Utilisateur - UPDATE id : " + id);

    try{
      return await Utilisateur.updateOne({_id : new ObjectId(id)}, {$set : body});
    } catch(err) {
      console.log("Process : Utilisateur - UPDATE : Error - " + err.name);

      return err;
    }
};

// -- DELETE
async function processDelete (id) {
    console.log("Process : Utilisateur - DELETE id : " + id);

    try{  
      return await Utilisateur.find({_id : new ObjectId(id)}).deleteOne();
    } catch(err) {
      console.log("Process : Utilisateur - DELETE : Error - " + err.name);

      return err;
    }
};

// -- READ ID
async function processRead (id) {
    console.log("Process : Utilisateur - READ id : " + new ObjectId(id));

    try{
      return await Utilisateur.findOne({_id : new ObjectId(id)});
    } catch(err) {
      console.log("Process : Utilisateur - READ : Error - " + err.name);

      return err;
    }
};

async function processReadName (name) {
  console.log("Process : Utilisateur - READ name : " + name);

    try{
      return Utilisateur.findOne({nom : { $regex : new RegExp(name, "i")} });
    } catch(err) {
      console.log("Process : Utilisateur - READ : Error - " + err.name);

      return err;
    }
};

exports.checkAuth = checkAuth;
exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadName = processReadName;