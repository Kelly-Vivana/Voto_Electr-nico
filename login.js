//Invocacion de modulos
const path= require('path');
const con = require('./src/database/db_Coneccion');
const mysql= require('mysql'); //encargado de hacer peticiones
const { json } = require('express');

//Invocacion de express
const express= require('express');
//Inicializaciones (mando a ejecutar express y devuelve la app)
const app =express();

//configuracion de la app
app.set('port', process.env.PORT || 3000); // si el servicio de la nube da un puerto usalo, caso contrario usa el 3000
app.set('views', path.join( __dirname, '/src/views'));
app.set('view engine', 'ejs');

//Invocacion de Bcrypt
const bcryptjs = require('bcryptjs');

//Invocacion a variables de sesion
const session= require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized: true
}));

//Captura de datos de formulaios
app.use(express.urlencoded({extended:false}));
app.use(express(json));

//Routes
app.use(require('./src/routes/index'));

//Acceso a los archivos publicos
app.use(express.static(path.join(__dirname, 'src/public')));

//iniciar el servidor
app.listen(app.get('port'), ()=>{ //obtiene el puerto
    console.log("port ", app.get('port'));
});
