// ---- MANAGE DATABASE
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect("mongodb://localhost:27017/WITOBDD");
var db = mongoose.connection;
db.on('Error',console.error.bind(console, 'Error: erreur de connection à mongodb'));
db.once('open', function(){
  console.log("BDD: Connected")
})

//Body Parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json({type:"*/*"}));

app.listen(3010);

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//app.use('/path',require('./path/route'));