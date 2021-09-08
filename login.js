const express = require('express');
const app = express();
const path = require('path');
// app.use(express.static('public/index.html'));

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "public/index.html"));
})

app.listen(3000, ()=>{
    console.log("Puerto 3000");
});

