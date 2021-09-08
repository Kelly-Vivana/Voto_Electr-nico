const express = require("express");
const path= require('path');
const bodyParse = require('body-parser');
const { appendFile } = require("fs");

//Inicializaciones (mando a ejecutar express y devuelve la app)
const app =express();

//configuracion de la app
app.set('port', process.env.PORT || 3000); // si el servicio de la nube da un puerto usalo, caso contrario usa el 3000
app.set('views', path.join( __dirname, '../app/views'));
app.set('views', 'ejs');

