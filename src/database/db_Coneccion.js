//archivos importados
const mysql = require('mysql');

//coneccion a la base de datos
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'voto_electrónico',
    multipleStatements: true
  });
  con.connect((err) => {
    if(err){
      console.log('El error de conexion es:' + err);
      return;
    }
    console.log('Conección establecida');
  });

  module.exports=con;

  //Consultas a la base
  // con.query(
  //   `select * from candidato`,
  //   (err, rows) => {
  //     if(err) throw err;
  //     console.log(rows);
  //   }
  // );