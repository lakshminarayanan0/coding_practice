const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const { filterRouter } = require('./filterRoutes')
const redisClient = require('./redis/redis')
// const redisClient = require('./redis/redis')
const app=express()



app.use(cors())
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/billing', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB successfully!'));

app.use(express.json());



app.use('/filters',filterRouter)

app.get('/',(req,res,next)=>{
    res.send("Home")
  })
app.get("*",(req,res,next)=>{
    res.status(404).send({message:"404 page not found."})
  })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });