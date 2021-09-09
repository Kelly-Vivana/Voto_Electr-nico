const express= require('express');
const router= express.Router(); //modulo router pertenece a express, es encargado de crear las rutas

router.get('/', (req,res)=>{
    res.render('index');
});
router.get('/registro', (req,res)=>{
    res.render('registro');
});

//  app.get('/registro', (req,res)=>{
//     res.render('registro', {title: Registrarse});
//  });

 module.exports = router;