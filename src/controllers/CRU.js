const con = require("../database/db_Coneccion");

exports.save = (req, res) => {
  const nombre = req.body.nombre;
  const cargo = req.body.cargo;
  const funcion = req.body.funcion;
  const lista = req.body.lista;
  req.session.loggedIn = true;
  login = req.session.loggedIn;
  const candidato = con.query(
    `SELECT nombre FROM candidato WHERE nombre = ? `,
    [nombre],
    (err, result) => {
      if (err) throw err;
      if (
        result.length === 0 &&
        lista.length !== 0 &&
        cargo !== "--Selecciona el cargo--" &&
        funcion !== "--Selecciona la funcion--"
      ) {
        con.query(
          `insert into candidato set ? `,
          {
            nombre: nombre,
            id: cargo,
            id_funcion: funcion,
            lista: lista,
          },
          (err, results) => {
            if (err) {
              throw err;
            } else {
              res.redirect("/candidatos", {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Candidato registrado correctamente",
                alertIcon: "success",
                showConfirmButton: false,
                time: false,
                ruta: "votantes",
              });
            }
          }
        );
      } else {
        console.log(cargo);
        res.redirect("/candidatos");
      }
    }
  );
};

exports.save_Votante = (req, res) => {
  const ide = req.body.identificacion;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const facultad = req.body.facultad;
  req.session.loggedIn = true;
  login = req.session.loggedIn;
  console.log(ide, nombre, apellido, facultad);
  if (
    ide.length === 0 ||
    nombre.length === 0 ||
    apellido.length === 0 ||
    facultad.length === 0
  ) {
    res.render("createVotante", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Debe llenar todo los campos",
      alertIcon: "error",
      showConfirmButton: false,
      time: false,
      rol: 1,
      login,
      name: req.session.name,
      ruta: "createVotante",
    });
  } else {
    con.query(
      `SELECT identificacion FROM votantes WHERE identificacion = ? `,
      [ide],
      (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result.length === 0) {
            console.log("No existe, se puede crear");
            con.query(
              `insert into votantes set ? `,
              {
                identificacion: ide,
                nombre: nombre,
                apellido: apellido,
                facultad: facultad,
                id_rol: 2,
              },
              (err, results) => {
                if (err) throw err;
                res.render("createVotante", {
                  alert: true,
                  alertTitle: "Reistro",
                  alertMessage: "Votante registrado correctamente",
                  alertIcon: "success",
                  showConfirmButton: false,
                  time: false,
                  rol: 1,
                  login,
                  name: req.session.name,
                  ruta: "votantes",
                });
              }
            );
          } else {
            res.render("createVotante", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "El Votante ya se encuentra registrado",
              alertIcon: "error",
              showConfirmButton: false,
              time: false,
              rol: 1,
              login,
              name: req.session.name,
              ruta: "createVotante",
            });
          }
        }
      }
    );
  }
};
exports.update = (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const cargo = req.body.cargo;
  const funcion = req.body.funcion;
  const lista = req.body.lista;
  con.query(
    `UPDATE candidato SET ? WHERE id=?`,
    [{ nombre: nombre, id: cargo, id_funcion: funcion, lista: lista }, id],
    (err, result) => {
      if (err) throw err;
      res.redirect("/candidatos");
    }
  );
};

exports.inicio = (req, res) => {
  var queries = [
    `SELECT Nombre, id_rol, Identificacion FROM administrador WHERE identificacion = ?`,
    `SELECT nombre, id_rol, identificacion FROM votantes WHERE identificacion = ? `,
    `SELECT fechaInicio, fechaFin FROM eleccion order by id desc limit 0, 1 `,
  ];
  const usuario = req.body.cedula;
  if (usuario) {
    con.query(queries.join(";"), [usuario, usuario], (err, result) => {
      if (err) throw err;
      // si no esta registrado
      if (result[0].length === 0 && result[1].length === 0) {
        res.render("index", {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Usuario no esta habilitado en el sistema",
          alertIcon: "error",
          showConfirmButton: false,
          time: false,
          ruta: "",
        });
      } else if (result[0].length > 0 && result[1].length === 0) {
        req.session.loggedIn = true;
        req.session.rol = result[0][0].id_rol;
        req.session.name = result[0][0].Nombre;
        req.session.cedula = result[0][0].Identificacion;
        res.render("index", {
          alert: false,
          alertTitle: "Administrador",
          alertMessage: "Ingreso exitoso",
          alertIcon: "success",
          showConfirmButton: false,
          time: 1500,
          ruta: "configVotacion",
        });
      } else {
        req.session.loggedIn = true;
        req.session.rol = result[1][0].id_rol;
        req.session.name = result[1][0].nombre;
        req.session.cedula = result[1][0].identificacion;
        res.render("index", {
          alert: true,
          alertTitle: "Votaciones",
          alertMessage: "Ingreso exitoso",
          alertIcon: "success",
          showConfirmButton: false,
          time: 1000,
          ruta: "",
        });
      }
    });
  } else {
    res.render("index", {
      alert: true,
      alertTitle: "Error",
      alertMessage: "Ingrese su cedula",
      alertIcon: "error",
      showConfirmButton: false,
      time: 1500,
      ruta: "",
    });
  }
};

exports.votos = (req, res) => {
  let voto = " ";
  const cedula = req.body.cedul;
  req.session.loggedIn = true;
  login = req.session.loggedIn;
  console.log(contentHtml);
  var queries = [
    `SELECT Identificacion, voto FROM administrador WHERE Identificacion=? and voto = ?`,
    `SELECT identificacion, voto FROM votantes WHERE Identificacion=? and voto = ? `,
  ];
  con.query(queries.join(";"), [cedula, voto, cedula, voto], (err, result) => {
    if (err) throw err;
    if (result[0].length > 0 && result[1].length === 0) {
      voto = "true";
      con.query(
        `UPDATE administrador SET ? WHERE Identificacion=?`,
        [{ voto: voto }, cedula],
        (err, result) => {
          if (err) throw err;
          console.log(result[0]);
          res.render("", {
            alert: false,
            alertTitle: "Votaciones",
            alertMessage: "Agregando voto de administrador a la blockchain",
            alertIcon: "success",
            showConfirmButton: false,
            time: 1500,
            ruta: "",
          });
        }
      );
    } else if (result[0].length === 0 && result[1].length > 0) {
      voto = "true";
      con.query(
        `UPDATE votantes SET ? WHERE Identificacion=?`,
        [{ voto: voto }, cedula],
        (err, result) => {
          if (err) throw err;
          console.log(result[1]);
          res.render("", {
            alert: false,
            alertTitle: "Votaciones",
            alertMessage: "Agregando voto de votante a la blockchain",
            alertIcon: "success",
            showConfirmButton: false,
            time: 1500,
            ruta: "",
          });
        }
      );
    } else {
      console.log(result[1]);
      console.log(result[0]);
      res.render("", {
        alert: false,
        alertTitle: "Votaciones",
        alertMessage: "Usted ya voto",
        alertIcon: "success",
        showConfirmButton: false,
        time: 1500,
        ruta: "",
      });
    }
  });
};
exports.eleccion = (req, res) => {
  console.log("Llego");
  function getDate(date) {
    //This function assumes that the dateString will always be of the format YYYY-MM-DD HH:MM:SS
    var dateParts = date.split(' ');
    var dateStr = dateParts[0].split('-');
    var timeStr = dateParts[1].split(':');
    var dateTimeArr = dateStr.concat(timeStr)
    return new Date(dateTimeArr[0], dateTimeArr[1]-1, dateTimeArr[2], dateTimeArr[3], dateTimeArr[4], dateTimeArr[5]);
}

req.session.loggedIn = true;
login = req.session.loggedIn;
const fechanInicio = req.body.fecha;
const fechaFin = req.body.fechaF;
let fechaI = fechanInicio.replace("T", " ");
let fechaF = fechaFin.replace("T", " ");

var date1 = getDate(fechaI);  
var date2 = getDate(fechaF);

if(date1 > date2){
  console.log("Fecha mayor");
  con.query(`SELECT * FROM eleccion`, (err, result)=>{
    if(err) throw err;
  res.render("index", {
    alert: false,
    alertTitle: "Asignacion de Fechas",
    alertMessage: "La Fecha de inicio debe ser menor a la de fin",
    alertIcon: "error",
    showConfirmButton: true,
    time: false,
    rol: 1,
    login,
    results: result, 
    name: req.session.name,
    ruta: "configVotacion",
  });
});
}else{ console.log("esta bien")
con.query(
  `insert into eleccion set ? `,
   {
     fechaInicio: date1, 
     fechaFin: date2
   },
  (err, result) => {
    if (err) throw err;
    res.redirect("/configVotacion");
  }
);
}
  
};

