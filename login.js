//archivos importados

const app= require('./src/config/server.js');
app.use= require('./src/routes/index');

//Inicializaciones (mando a ejecutar express y devuelve la app)
const app =express();

//configuracion de la app
app.set('port', process.env.PORT || 3000); // si el servicio de la nube da un puerto usalo, caso contrario usa el 3000
app.set('views', path.join( __dirname, '../app/views'));
app.set('views', 'ejs');

// app.use(express.static('public/index.html'));

//Configuracion

// app.use(express.static('src'));



app.listen(app.get('port'), ()=>{ //obtiene el puerto
    console.log("port ", app.get('port'));
});

