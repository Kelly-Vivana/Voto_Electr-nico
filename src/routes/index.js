const express= require('express');
const router= express.Router(); //modulo router pertenece a express, es encargado de crear las rutas

const app= express();

app.get('/', (req,res)=>{
    res.render('index');
 });

 app.get('/registro', (req,res)=>{
    res.render('registro', {title: Registrarse});
 });

 module.exports=router;