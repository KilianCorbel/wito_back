let auth = module.exports;
const EtudiantProcess = require("./etudiantProcess");

// Connexion
auth.checkAuth = function(req, res, next) {
    EtudiantProcess.checkAuth(req, res);
};