const mongoose = require('mongoose');

//model pour un cours

const coursSchema = new mongoose.Schema({
    idCours : {
        type : String,
        required : true,
    },
    nom : {
        type :  String,
        required : true,
    },
    heureD : {
        type : String,
        required : true
    },
    heureF : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    salle : {
        type : String,
        required : true
    }
});

const Cours = mongoose.model("Cours", coursSchema);
module.exports = Cours;
