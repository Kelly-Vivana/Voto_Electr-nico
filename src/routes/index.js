const express= require('express');
const router= express.Router(); //modulo router pertenece a express, es encargado de crear las rutas

router.get('/', (req,res)=>{
    res.render('index');
});
router.get('/registro', (req,res)=>{
    res.render('registro');
});
router.get('/candidatos', (req,res)=>{
    res.render('candidatos');
});
//  app.get('/registro', (req,res)=>{
//     res.render('registro', {title: Registrarse});
//  });

 module.exports = router;