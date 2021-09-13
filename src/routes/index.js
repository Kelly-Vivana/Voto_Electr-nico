const { application } = require('express');
const express= require('express');
const con = require('../database/db_Coneccion')
const router= express.Router(); //modulo router pertenece a express, es encargado de crear las rutas
const app=express();


const crud = require('../controllers/CRU');
router.post('/save', crud.save);
router.post('/update', crud.update);



router.get('/', (req,res)=>{
    res.render('index');
});

// router.get('/registro', (req,res)=>{
//     res.render('registro');
// });


// router.post('/inicio', async (req,res)=>{
//     const usuario= req.body.cedula;
//     const pass = req.body.contraseña;
//     let passHash = await bcryptjs.hash(pass, 8);
//     if(usuario && pass){
//         con.query(`SELECT * FROM usuarios WHERE Identificacion = ? `, [usuario], async(err, result)=>{
//           // si no esta registrado o si la password no coincide
//             if(result.length == 0 || !(await bcryptjs.compare(pass, result[0].Contraseña))){ 
//                     res.send('Usuario o Pass incrorrecta');
//             }else{res.send('Login correcto');}
//        })
//     }
// });
// router.get('/votantes', (req,res)=>{
//     res.render('votantes');
// });
router.get('/candidatos', (req,res)=>{
    con.query(`SELECT id, nombre, lista, funcion, cargo 
                FROM candidato c, funcion f, cargo cr 
                WHERE c.id_cargo=cr.id_cargo AND
                c.id_funcion= f.id_funcion`, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.render('candidatos', {results: result});
        }
    });
});


router.get('/delete:id', (req, res)=>{
    const id= req.params.id;
    con.query('DELETE FROM candidato WHERE id= ?', [id], (err,result)=>{
        if(err) throw err;
        res.redirect('/candidatos');
    });
});

var queries = [
    `select id_cargo, cargo from cargo`,
    `select id_funcion, funcion from funcion`
    
    ];
    
router.get('/createCandidato', (req,res)=>{
    con.query(queries.join(';'), (err, result)=>{
        if(err){
            throw err;
        }else{
            res.render('createCandidato', {
                cargo: result[0],
                funcion: result[1]
            }); 
         }
     });
});

router.get('/registro', (req,res)=>{
    con.query(`SELECT id_rol, rol FROM rol`, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.render('registro', {rol: result});
        }
    });
});

router.post('/registro', crud.registro);

router.get('/editCandidato:id', (req,res)=>{
    const id= req.params.id;
    con.query(`select * from candidato where id= ?`, [id],(err,result)=>{
         if(err){ throw err;
        }else{
            con.query(queries.join(';'), (erro, resultd)=>{
              if(erro){throw erro;
              }else{
                  res.render('editCandidato', {
                       cargo: resultd[0],
                       funcion: resultd[1],
                      candidato: result[0]
                      });
                    }
                });
        }
    });
});
    

//  app.get('/registro', (req,res)=>{
//     res.render('registro', {title: Registrarse});
//  });

 module.exports = router;