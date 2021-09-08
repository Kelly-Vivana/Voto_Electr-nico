//archivos importados
const { use } = require('./src/routes/index.js');
const app= require('./src/config/server.js');
app.use= require('./src/routes/index');


// app.use(express.static('public/index.html'));

//Configuracion

// app.use(express.static('src'));



app.listen(app.get('port'), ()=>{ //obtiene el puerto
    console.log("port ", app.get('port'));
});

