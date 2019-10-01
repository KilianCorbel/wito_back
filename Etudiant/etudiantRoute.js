const router = require("express").Router();
const etudiantAction = require("./etudiantAction");
//--Connexion
router.post("/login", etudiantAction.checkAuth);

module.exports = router;