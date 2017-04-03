// importar modulo do framework express-vali
var express = require ('express');
// importar o modulo do framework consign
var consign = require('consign');
// importar o body parser
var bodyParser = require('body-parser');
// importar o modulo do express-validator
var expressValidator = require('express-validator');
// essa instancia de o o require esta esperando
var app = express();
// configurar o ejs
// setar as variaveis que a views engine e a views do express
app.set('view engine','ejs');
app.set('views','./app/views');
// configuração dos middleware express,static
app.use(express.static('./app/public'));
//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended:true}));
//configurar o middleware express-validator
app.use(expressValidator());
// efetua o autlouad das rotas models e controles para o abjeto app
consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app);



// expporta o objeto app

module.exports = app ;
