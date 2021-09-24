const con = require('../database/db_Coneccion');

exports.save=(req,res)=>{
    const nombre= req.body.nombre;
    const cargo = req.body.cargo;
    const funcion = req.body.funcion;
    const lista =req.body.lista;
    //let EDFile = req.file.archivo;
    //const Uppath = __dirname + '/files/' + file.name;
    //console.log(EDFile.name);
    /*if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      console.log(EDFile);*/
    const candidato= con.query(`SELECT nombre FROM candidato WHERE nombre = ? `, [nombre] ,(err, result)=>{
        if(err)throw err;
        if(result.length=== 0 &&  lista.length !== 0 && cargo !== '--Selecciona el cargo--'&& funcion !== '--Selecciona la funcion--') {
            con.query(`insert into candidato set ? `, 
            {nombre:nombre, id_cargo:cargo, id_funcion:funcion, lista:lista, imagen:productData}, (err, results)=>{
            if(err) {throw err;}
            else{res.redirect('/candidatos');
                }
             });
        }
        else{ console.log(cargo);
        res.redirect('/candidatos');
        console.log("No se puede guardar usuario"); }
    });
    
 }

 exports.save_Votante=(req,res)=>{
    const ide= req.body.identificacion;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const facultad =req.body.facultad;
    console.log(ide, nombre,apellido,facultad);
    if (ide.length === 0 || nombre.length === 0 || apellido.length === 0 || facultad.length === 0){
        res.render('createVotante', {
            alert:true,
            alertTitle: "Error",
            alertMessage: "Debe llenar todo los campos",
            alertIcon: 'error',
            showConfirmButton: false,
            time: false,
            ruta: 'createVotante'
         });
    }  
    else{
        con.query(`SELECT identificacion FROM votantes WHERE identificacion = ? `, [ide] ,(err, result)=>{
            if(err){throw err;}
            else{
                if(result.length === 0 ) {
                console.log('No existe, se puede crear');
                con.query(`insert into votantes set ? `, 
                {identificacion:ide, nombre:nombre, apellido:apellido, facultad:facultad, id_rol:2}, (err, results)=>{
                if(err) throw err;
                res.render('createVotante', {
                    alert:true,
                    alertTitle: "Reistro",
                    alertMessage: "Votante registrado correctamente",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    time: false,
                    ruta: 'votantes'
                });
                });
                }
            else{
                res.render('createVotante', {
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "El Votante ya se encuentra registrado",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    time: false,
                    ruta: 'createVotante'
                });
            }
        }
    });
}
}
 exports.update=(req,res)=>{
    const id= req.body.id;
    const nombre= req.body.nombre;
    const cargo = req.body.cargo;
    const funcion = req.body.funcion;
    const lista =req.body.lista;
    con.query(`UPDATE candidato SET ? WHERE id=?`, 
             [{nombre:nombre, id_cargo:cargo, id_funcion:funcion, lista:lista}, id] ,(err, result)=>{
                   if(err)throw err;
                   res.redirect('/candidatos')});
        }


exports.inicio = (req,res)=>{
    var queries = [
        `SELECT Nombre, id_rol FROM administrador WHERE identificacion = ?`, 
        `SELECT nombre, id_rol FROM votantes WHERE identificacion = ? `
    ]
    const usuario= req.body.cedula;
        if(usuario){
            con.query(queries.join(';'), [usuario, usuario], (err, result)=>{
            if(err)throw err;
             // si no esta registrado 
            if(result[0].length === 0 && result[1].length === 0){ 
                res.render('index', {
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "Usuario no esta habilitado en el sistema",
                    alertIcon: 'error',
                    showConfirmButton: false,
                    time: false,
                    ruta: ''
                 });
            }
            else if(result[0].length > 0 && result[1].length === 0){ 
                req.session.loggedIn=true;
                req.session.rol= result[0][0].id_rol;
                req.session.name = result[0][0].Nombre;
                res.render('index', {
                    alert:false,
                    alertTitle: "Administrador",
                    alertMessage: "Ingreso exitoso",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    time: 1500,
                    ruta: 'candidatos'

                });
            }
           else{
            req.session.loggedIn =true;
            req.session.rol= result[1][0].id_rol;
            req.session.name = result[1][0].nombre;
                res.render('index', {
                    alert:true,
                    alertTitle: "Votaciones",
                    alertMessage: "Ingreso exitoso",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    time: 1000,
                    ruta: ''
                });
            }
        });
    }else{
        res.render('index', {
            alert:true,
            alertTitle: "Error",
            alertMessage: "Ingrese su cedula",
            alertIcon: 'error',
            showConfirmButton: false,
            time: 1500,
            ruta: ''
        });
    }
}
        
        
 
    


