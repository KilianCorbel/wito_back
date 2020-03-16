const mongoose = require('mongoose');
const Cours = require("./coursModel");
const Utilisateur = require('../Utilisateur/utilisateurProcess');
const ical = require('ical');

ObjectId = mongoose.Types.ObjectId;

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Cours - FIND ALL");

  return await Cours.find().populate('classe').populate('professeur');
};

// -- CREATE
async function processCreate (req, mdp) {
    console.log("Process : Cours - CREATE :" + req.body.nom);

    newCours = new Cours({nom:req.body.nom, date: req.body.date, heureD:req.body.heureD, heureF:req.body.heureF, salle:req.body.salle, classe:req.body.classe, professeur:req.body.professeur, presents:[], presentsProvisoire:[]});

    return await newCours.save();
};

async function processCreateIcs (req) {
    console.log("Process : ics : " + req.body.lien);
    const classe = req.body.classe;
    const cours = [];
    ical.fromURL(req.body.lien, {}, function (err, data) {
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                let ev = data[k];
                if (ev.type == 'VEVENT') {
                    let minutesD = ev.start.getMinutes();
                    let minutesF = ev.end.getMinutes();
                    if (minutesD == "0") {
                        minutesD = "00";
                    } else if (minutesF == "0") {
                        minutesF = "00";
                    }
                    let date = ("0" + ev.end.getDate()).slice(-2) + "/" + ("0" + ev.end.getMonth() + 1).slice(-2) + "/" + ev.end.getFullYear();
                    let heureD = ev.start.getHours() + ":" + minutesD;
                    let heureF = ev.end.getHours() + ":" + minutesF;
                    let salle = ev.location;

                    let desc = ev.description.val;
                    let from = desc.indexOf("MATIERE : ") + "MATIERE : ".length;
                    let to = desc.indexOf("PROF");
                    let nom = desc.substring(from, to).trim();

                    let fromProf = desc.indexOf("PROF : ") + "PROF : ".length;
                    let toProf = desc.indexOf("DUREE");
                    let prof = desc.substring(fromProf, toProf).trim();
                    let user;
                    // if (prof !== "" || prof !== "null") {
                    Utilisateur.processReadName(prof.toLowerCase()).then((callback) => {
                        user = callback;
                    })
                    console.log(user);
                    if (user != null) {

                    }
                    
                    
                    console.log("date " +date);
                    console.log("heureD "+ heureD);
                    console.log("heureF " + heureF);
                    console.log("nom " + nom);
                    console.log("salle " + salle);
                    console.log("prof " + prof);
                    

                    

                    //let newCours = new Cours({nom:result, date:${ev.end.getDay()}/${ev.end.getMonth()}/${ev.end.getFullYear()}})
                    //console.log(`description : ${ev.description.val} start : ${ev.start.getHours()}:${ev.start.getMinutes()} end : ${ev.end.getHours()}:${ev.end.getMinutes()} date : ${ev.end.getDay()}/${ev.end.getMonth()}/${ev.end.getFullYear()} location : ${ev.location}`);
                }
            }
        }
    });
    console.log(classe);
    return await cours;
}

// -- UPDATE
async function processUpdate (id, body) {
    console.log("Process : Cours - UPDATE id : " + id);
    
    return await Cours.updateOne({_id : new ObjectId(id)}, {$set : body});
};

// -- DELETE
async function processDelete (id) {
    console.log("Process : Cours - DELETE id : " + id);
    
    return await Cours.find({_id : new ObjectId(id)}).deleteOne();
};

// -- READ ID
async function processRead (id) {
    console.log("Process : Cours - READ id : " + new ObjectId(id));

    return await Cours.findOne({_id : new ObjectId(id)}).populate('presents').populate({path: 'professeur', populate: {path: 'utilisateur'}});
};

// -- READ BY CRITERE
async function processReadByCritere (critere, variable) {
    console.log("Process : Cours - READ BY ROLE : " + variable);

    return await Cours.find({[critere] : variable}).populate('classe').populate({path: 'professeur', populate: {path: 'utilisateur'}});
};

// -- READ BY PROFESSEUR ID
async function processReadByProfesseurId (id) {
    console.log("Process : Cours - READ BY PROFESSEUR ID : " + new ObjectId(id));

    return await Cours.find({professeur:{ _id: new ObjectId(id) }}).populate('classe').populate({path: 'professeur', populate: {path: 'utilisateur'}});
};

// -- READ BY CLASSE
async function processReadByClasse (id) {
    console.log("Process : Cours - READ BY CLASSE : " + new ObjectId(id));

    return await Cours.find({classe:{ _id: new ObjectId(id) }}).populate('classe').populate({path: 'professeur', populate: {path: 'utilisateur'}});
};

// -- UPDATE PRESENT
async function processUpdatePresent(id, body) {
    console.log("Process : Cours - UPDATE PRESENT : " + new ObjectId(id));
    
    return await Cours.updateOne({_id : new ObjectId(id)}, {$set : body});
};

exports.processFindAll = processFindAll;
exports.processCreate = processCreate;
exports.processUpdate = processUpdate;
exports.processDelete = processDelete;
exports.processRead = processRead;
exports.processReadByCritere = processReadByCritere;
exports.processReadByProfesseurId = processReadByProfesseurId;
exports.processReadByClasse = processReadByClasse;
exports.processUpdatePresent = processUpdatePresent;
exports.processCreateIcs = processCreateIcs;