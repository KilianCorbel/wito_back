const mongoose = require('mongoose');

//model pour un administrateur

const administrateurSchema = new mongoose.Schema({
  mail : {
    type : String,
    unique: true,
    required : true,
    regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  },
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur'
  }
});

const Administrateur = mongoose.model("Administrateur", administrateurSchema);
module.exports = Administrateur;