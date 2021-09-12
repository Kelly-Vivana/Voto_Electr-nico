const con = require('../database/db_Coneccion')

exports.save=(req,res)=>{
    const nombre= req.body.nombre;
    const cargo = req.body.cargo;
    const funcion = req.body.funcion;
    const lista =req.body.lista;
    const candidato= con.query(`SELECT nombre FROM candidato WHERE nombre = ? `, [nombre] ,(err, result)=>{
        if(err)throw err;
        if(result.length=== 0 &&  lista.length !== 0 && cargo !== '--Selecciona el cargo--'&& funcion !== '--Selecciona la funcion--') {
            con.query(`insert into candidato set ? `, 
            {nombre:nombre, id_cargo:cargo, id_funcion:funcion, lista:lista}, (err, results)=>{
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

  exports.registro =async (req,res)=>{
    const cedula= req.body.cedula;
    const pass = req.body.contraseña;
    const rol = req.body.rol;
    let passHash = await bcryptjs.hash(pass, 8);
    const votante= con.query(`SELECT identificacion, id_rol FROM administrador WHERE identificacion = ? and rol= ? `, [cedula, rol] ,(err, result)=>{
        if(err)throw err;
        if(result.length !== 0 ) {
            con.query(`INSERT INTO usuarios SET = ? `, {cedula:Identificacion, pass:Contraseña, rol:id_rol}, async(err, result)=>{
          // si no esta registrado o si la password no coincide
        else if(result.length === 0 ){ 
                    res.send('Usuario o Pass incrorrecta');
            }else{res.send('Login correcto');}
       })
    }
});

 
    


