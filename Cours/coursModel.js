const mongoose = require('mongoose');

//model pour un cours

const coursSchema = new mongoose.Schema({
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
    },
    classe : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required : true
    },
    professeur : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professeur',
        required : true
    },
    presents : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etudiant'
    }],
    presentsProvisoire : [{
        nom : {
            type :  String
        },
        prenom : {
            type : String
        }
    }]
});

const Cours = mongoose.model("Cours", coursSchema);
module.exports = Cours;
