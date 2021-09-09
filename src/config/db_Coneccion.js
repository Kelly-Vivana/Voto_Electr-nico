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
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  //Consultas a la base
  con.query(
    `SELECT * FROM usuarios `,
    (err, rows) => {
      if(err) throw err;
      console.log(rows);
    }
  );