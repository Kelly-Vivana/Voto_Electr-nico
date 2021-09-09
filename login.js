//archivos importados
const express= require('express');
const path= require('path');
const con = require('./src/config/db_Coneccion');
const mysql= require('mysql') //encargado de hacer peticiones

//Inicializaciones (mando a ejecutar express y devuelve la app)
const app =express();

//configuracion de la app
app.set('port', process.env.PORT || 3000); // si el servicio de la nube da un puerto usalo, caso contrario usa el 3000
app.set('views', path.join( __dirname, '/src/views'));
app.set('view engine', 'ejs');

//Middleware
//Variables globales

//Routes
app.use(require('./src/routes/index'));

//Acceso a los archivos publicos
app.use(express.static(path.join(__dirname, 'src/public')));

//iniciar el servidor
app.listen(app.get('port'), ()=>{ //obtiene el puerto
    console.log("port ", app.get('port'));
});
