const { application } = require('express');
const express= require('express');
const con = require('../database/db_Coneccion')
const router= express.Router(); //modulo router pertenece a express, es encargado de crear las rutas
const app=express();


const crud = require('../controllers/CRU');
router.post('/save', crud.save);
router.post('/save_Votante', crud.save_Votante);
router.post('/update', crud.update);
router.post('/inicio', crud.inicio);

router.get('/login', (req,res)=>{
    res.render('index');
});
router.get('/logout', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('login');
    })
});

router.get('/', (req,res)=>{
    //let user= req.session.name;
    var queries = [
        `select id, nombre from lista`,
        `SELECT nombre,cargo, lista, id_cargo FROM candidato, cargo WHERE candidato.id_cargo = cargo.id`
        ];
    if(req.session.loggedIn){
   //     res.locals.user = req.session.name;
   con.query(queries.join(';'), (err, result)=>{
     if(err)throw err; 
     res.render('ingreso',{
            listas: result[0],
            candidatos: result[1],
            login: true,
            name: req.session.name
      });
});
    }else{
        res.render('index',{
        login: false
    });
    }   
});

router.get('/candidatos', (req,res)=>{
    if(req.session.loggedIn && req.session.rol == 1){
        con.query(`SELECT c.id, nombre, lista, funcion, cargo 
                    FROM candidato c, funcion f, cargo cr 
                    WHERE c.id_cargo=cr.id
                    AND
                    c.id_funcion= f.id_funcion`, (err, result)=>{
            if(err)throw err;
            res.render('candidatos', {
                results: result,
                login: true,
                name: req.session.name});
        });
    }else{
        res.render('index',{
        login: false });
    }
});   

var queries = [
    `select id, cargo from cargo`,
    `select id_funcion, funcion from funcion`
    
    ];

router.get('/createCandidato', (req,res)=>{
    if(req.session.loggedIn && req.session.rol == 1){
    con.query(queries.join(';'), (err, result)=>{
        if(err){
            throw err;
        }else{
            res.render('createCandidato', {
                cargo: result[0],
                funcion: result[1],
                login: true,
                name: req.session.name
            }); 
         }
     });
    }else{
        res.render('index',{
        login: false });
    }
});

router.get('/editCandidato:id', (req,res)=>{
    if(req.session.loggedIn && req.session.rol == 1){
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
                      candidato: result[0],
                      login: true,
                      name: req.session.name
                      });
                    }
                });
        }
    });
}else{
    res.render('index',{
    login: false });
}
});

router.get('/delete:id', (req, res)=>{
    const id= req.params.id;
    con.query('DELETE FROM candidato WHERE id= ?', [id], (err,result)=>{
        if(err) throw err;
        res.redirect('/candidatos');
    });
});


router.get('/votantes', (req,res)=>{
    if(req.session.loggedIn && req.session.rol == 1){
    con.query(`SELECT * FROM votantes`, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.render('votantes', {
                results: result, 
                login: true,
                name: req.session.name
            });
        }
    });
}else{
    res.render('index',{
    login: false });
}
});

router.get('/createVotante', (req,res)=>{
    if(req.session.loggedIn && req.session.rol == 1){
    res.render('createVotante');
}else{
    res.render('index',{
    login: false });
}
});

router.get('/deleteVotante:id', (req, res)=>{
    const cedula= req.params.id;
    con.query('DELETE FROM votantes WHERE identificacion= ?', [cedula], (err,result)=>{
        if(err) throw err;
        res.redirect('/votantes');  
    });
});


router.get('/estadisticas', (req,res)=>{
    
    if(req.session.loggedIn){
    res.render('estadisticas',{
        login: true,
        name: req.session.name
    });
    }else{
        res.render('index',{
        login: false,
        name: 'Debe iniciar session'
    });
    }
});



    

//  app.get('/registro', (req,res)=>{
//     res.render('registro', {title: Registrarse});
//  });

 module.exports = router;