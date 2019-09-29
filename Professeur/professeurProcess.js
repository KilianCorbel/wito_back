const auth = module.exports;
const Professeur = require("./professeurModel");

// AUTHENTIFICATION CONNEXION
auth.checkAuth = function(req, res, next) {
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