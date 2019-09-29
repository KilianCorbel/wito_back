let auth = module.exports;
const ProfesseurProcess = require("./professeurProcess");

// Connexion
auth.checkAuth = function(req, res, next) {
    ProfesseurProcess.checkAuth(req, res);
};