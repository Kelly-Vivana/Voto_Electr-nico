const express= require('express');
const con = require('../database/db_Coneccion')
const router= express.Router(); //modulo router pertenece a express, es encargado de crear las rutas

router.get('/', (req,res)=>{
    res.render('index');
});
router.get('/votantes', (req,res)=>{
    res.render('votantes');
});
router.get('/candidatos', (req,res)=>{
    con.query(`select * from candidato`, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.render('candidatos', {results: result});
        }
    });
});

var queries = [
    `select cargo from cargo`,
    `select funcion from funcion`
    
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
            console.log(result[0]);
         }
     });
});
    

//  app.get('/registro', (req,res)=>{
//     res.render('registro', {title: Registrarse});
//  });

 module.exports = router;