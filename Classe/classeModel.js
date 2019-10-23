const mongoose = require('mongoose');

//model pour une classe, promotion d etudiant

const classeSchema = new mongoose.Schema({
    filiere : {
        type : String,
        required : true,
    },
    annee : {
        type :  String,
        required : true,
    }
    
});

const Classe = mongoose.model("Classe", classeSchema);
module.exports = Classe;
