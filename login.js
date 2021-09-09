//archivos importados
const express= require('express');
//Inicializaciones (mando a ejecutar express y devuelve la app)
const app =express();
const mysql= require('mysql') //encargado de hacer peticiones
const path= require('path');


console.log(path.join(__dirname, 'src/public'));

//configuracion de la app
app.set('port', process.env.PORT || 3000); // si el servicio de la nube da un puerto usalo, caso contrario usa el 3000
app.set('views', path.join( __dirname, '/src/views'));
app.set('view engine', 'ejs');

//Middleware
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(myConnection(mysql, {
    host:'localhost',
    user:'root',
    password:'',
    port: 3306,
    database: 'votaciones'
}, 'single' ));


//Variables globales

//Routes
app.use(require('./src/routes/index'));


//Acceso a los archivos publicos

//iniciar el servidor
app.listen(app.get('port'), ()=>{ //obtiene el puerto
    console.log("port ", app.get('port'));
});
