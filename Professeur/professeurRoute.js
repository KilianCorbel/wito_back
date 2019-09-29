const router = require("express").Router();
const professeurAction = require("./professeurAction");
//--Connexion
router.post("/login", professeurAction.checkAuth);