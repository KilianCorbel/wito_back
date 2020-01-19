const mongoose = require('mongoose');
// const bcrypt = require("bcrypt");

//model pour un utilisateur

const utilisateurSchema = new mongoose.Schema({
    nom : {
      type :  String,
      required : true
    },
    prenom : {
      type : String,
      required : true
    },
    mail : {
      type : String,
      unique: true,
      required : true,
      regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    },
    mdp : {
        type : String,
        required : true
    },
    role : {
      type : String,
      required : true
    },
    token: String
});
// ----- fonctions pour la connexion -----
utilisateurSchema.methods = {
    authenticate: function(password) {
      // return bcrypt.compareSync(password, this.mdp);
      if(password == this.mdp){
        return true;
      }
      return false;
    }
  };
  
  utilisateurSchema.methods.getToken = function() {
    console.log(this.token);
    if (this.token === undefined) {
      this.token = Date.now();
      console.log(this.token);
      this.save();
    }
    return this.token;
  };

  // ----- fonctions pour la connexion Fin -----

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);
module.exports = Utilisateur;