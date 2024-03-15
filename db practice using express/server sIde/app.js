const express=require('express');
const router = require('./router');
const app=express();
const cors = require('cors');


app.use(express.json())
app.use(cors())
app.use('/queries',router);

app.get('/',(req,res)=>{
    console.log("home page");
    res.send({message:'Welcome to express practice session!'})
})

app.use((req,res)=>{
    res.status(404).send({message:"404 page not found."})
})

app.listen(4000,()=>console.log("server starts ..."))