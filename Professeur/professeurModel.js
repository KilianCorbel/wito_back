const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

//model pour un professeur

const professeurSchema = new mongoose.Schema({
    numeroProfesseur : {
        type : String,
        required : true,
    },
    nom : {
        type :  String,
        required : true,
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
    login : {
        type : String,
        required : true
    },
    mdp : {
        type : String,
        required : true
    },
    token: String
});
// ----- fonctions pour la connexion -----
professeurSchema.methods = {
    authenticate: function(password) {
      return bcrypt.compareSync(password, this.mdp);
    },
    validateEmail : function(email) {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      }
  };
  
  professeurSchema.methods.getToken = function() {
    console.log(this.token);
    if (this.token === undefined) {
      this.token = Date.now();
      console.log(this.token);
      this.save();
    }
    return this.token;
  };

  // ----- fonctions pour la connexion Fin -----

const Professeur = mongoose.model("Professeur", professeurSchema);
module.exports = Professeur;