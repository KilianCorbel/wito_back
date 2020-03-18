const mongoose = require('mongoose');
const Cours = require("./coursModel");
const fs = require('fs');
const Utilisateur = require('../Utilisateur/utilisateurProcess');
const Professeur = require('../Professeur/professeurProcess');
const ical = require('ical');

ObjectId = mongoose.Types.ObjectId;

// -- FIND ALL
async function processFindAll () {
  console.log("Process : Cours - FIND ALL");

  return await Cours.find().populate('classe').populate({path: 'professeur', populate: {path: 'utilisateur'}});
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

    // traitement fichier .ics
    ical.fromURL(req.body.lien, {}, function (err, data) {
        for (let k in data) {
            // filtres données + event
            if (data.hasOwnProperty(k)) {
                let ev = data[k];
                if (ev.type == 'VEVENT') {
                    // déclaration variables
                    let newCours;
                    // mise au format minutes ("xx")
                    let minutesD = ev.start.getMinutes();
                    let minutesF = ev.end.getMinutes();
                    if (minutesD == "0") {
                        minutesD = "00";
                    } else if (minutesF == "0") {
                        minutesF = "00";
                    }

                    // mise au format mois
                    let month = ev.end.getMonth() + 1;
                    let date = ("0" + ev.end.getDate()).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + ev.end.getFullYear();
                    // heures
                    let heureD = ev.start.getHours() + ":" + minutesD;
                    let heureF = ev.end.getHours() + ":" + minutesF;
                    let salle = ev.location;

                    // desc = balise DESCRIPTION du .ics, découpage de string pour récupérer le nom du cours
                    let desc = ev.description.val;
                    let from = desc.indexOf("MATIERE : ") + "MATIERE : ".length;
                    let to = desc.indexOf("PROF");
                    let nom = desc.substring(from, to).trim();

                    // pareil pour le nom du prof
                    let fromProf = desc.indexOf("PROF : ") + "PROF : ".length;
                    let toProf = desc.indexOf("DUREE");
                    let prof = desc.substring(fromProf, toProf).trim();
                    let idProf;

                    // observation comportement dans un txt
                    // fs.writeFile("result.txt","test\n" + prof +"\n", function(err) {
                    //     if(err) throw err;
                    // });

                    // check si prof a une valeur
                    if (prof.trim() !== "") {
                        // cherche à trouver le nom du prof dans les utilisateurs
                        Utilisateur.processReadName(prof.toLowerCase()).then((callback) => {
                            if (callback !== null) {
                                // récup l'id utilisateur du prof
                                idProf = callback._id;
                                
                                // récup infos dans table professeur
                                Professeur.processReadByUserId(idProf).then((callback) => {
                                    idProf = callback._id;
    
                                    // création et enregistrement du cours
                                    newCours = new Cours({nom:nom, date: date, heureD:heureD, heureF:heureF, salle:salle, classe:classe, professeur: new ObjectId(idProf), presents:[], presentsProvisoire:[]});
                                    newCours.save();
                                    // fs.appendFile("result.txt",JSON.stringify(newCours)+"\n", function(err) {
                                    //     if(err) throw err;
                                    // });
                                })
                            }
                        })
                        // else si prof pas de valeur
                    } else {
                        // récup prof "inconnu" (prof "inconnu" => prérequis de fonctionnement)
                        Utilisateur.processReadName("inconnu").then((callback) => {
                            if (callback !== null) {
                                idProf = callback._id;
                                
                                // récup infos dans table professeur
                                Professeur.processReadByUserId(idProf).then((callback) => {
                                    idProf = callback._id;
    
                                    // création & save cours
                                    newCours = new Cours({nom:nom, date: date, heureD:heureD, heureF:heureF, salle:salle, classe:classe, professeur: new ObjectId(idProf), presents:[], presentsProvisoire:[]});
                                    newCours.save();
                                    // fs.appendFile("result.txt",JSON.stringify(newCours)+"\n", function(err) {
                                    //     if(err) throw err;
                                    // });
                                })
                            }
                        })
                    }
                }
            }
        }
        console.log("Bulk upload cours done");
    });
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