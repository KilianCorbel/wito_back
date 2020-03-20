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
                height: "45mm",
                contents: '<div style="font-size: 44px; font-weight: bold; text-align: center;">Feuille de présence</div>'
            },
            "footer": {
                "height": "28mm",
                "contents": {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
          };

          var users = [
            {
                name:"Shyam",
                age:"26"
            },
            {
                name:"Navjot",
                age:"26"
            },
            {
                name:"Vitthal",
                age:"26"
            }
        ]
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
                presentsProvisoire: callback.presentsProvisoire,
                users: users
            },
            path: "./output.pdf"
        };

        pdf.create(document, options)
        .then(res => {
            console.log(res)
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