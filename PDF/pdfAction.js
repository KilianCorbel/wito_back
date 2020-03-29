// -- Load model needed for the project
const CoursProcess = require('../Cours/coursProcess');
const pdf = require("pdf-creator-node");
const fs = require('fs');

// -- GENERATE BY ID
function actionGenerate (req, res) {
    console.log("Action : PDF - GENERATE BY ID");
    
    try{
        CoursProcess.processRead(req.params.id).then((callback) => {
          console.log("Process : Cours - READ ID : " + JSON.stringify(callback));

          // Read HTML Template
          var html = fs.readFileSync('./PDF/template.html', 'utf8');

          var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "35mm",
                contents: '<div style="font-size: 32px; font-weight: bold; text-align: center;">Feuille de présence</div>'
            },
            "footer": {
                "height": "10mm",
                "contents": {
                    // first: 'Cover page',
                    // 2: 'Second page', // Any page number is working. 1-based index
                    // default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    // last: 'Last Page'
                }
            }
          };
        
        var users = [];
        presents.forEach(function(student) {

        })

        var document = {
            html: html,
            data: {
                nom: callback.nom,
                heureD: callback.heureD,
                heureF: callback.heureF,
                date: callback.date,
                salle: callback.salle,
                classe: callback.classe.label,
                professeur: callback.professeur.utilisateur,
                presents: callback.presents,
                presentsProvisoire: callback.presentsProvisoire
            },
            path: "./"+callback.nom+".pdf"
        };

        pdf.create(document, options)
        .then(res => {
            console.log(res)
            return res;
        })
        .catch(error => {
            console.error(error)
        });

          /*  res.status(200).json({
              text: "Traitement Ok",
              descritpion: "Le cours a été trouvé"
            }) */

          res.send(callback);
        });
    } catch(err) {
        console.log("Action : PDF - GENERATE BY ID : Error - " + err);

/*         res.status(400).json({
            text: "Erreur",
            descritpion: "La classe a été trouvée"
          }) */

        res.send(err);
    }
};

exports.actionGenerate = actionGenerate;