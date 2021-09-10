//archivos importados
const mysql = require('mysql');

//coneccion a la base de datos
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'voto_electrónico'
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
  con.query(
    `SELECT * FROM usuarios `,
    (err, rows) => {
      if(err) throw err;
      console.log(rows);
    }
  );