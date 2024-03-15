const { sequelize } = require('./models');
const express=require('express')
const port=5000;
const app=express();
const cors=require('cors');
const { filterRouter } = require('./routes/FiltersRoutes');
const { productRouter } = require('./routes/ProductsRoutes');
const { customerRouter } = require('./routes/CustomerRoutes');
const { categoryRouter } = require('./routes/CategoryRoutes');
const { transactionRouter } = require('./routes/TransactionRoutes');

app.use(cors())
app.use(express.json())
app.use('/filters',filterRouter)
app.use('/products',productRouter)
app.use('/customers',customerRouter)
app.use('/categories',categoryRouter)
app.use('/transactions',transactionRouter)


app.get((req,res,next)=>{
  res.status(404).send({message:"404 page not found."})
})

app.get('/test', (req, res, next) => {
  console.log(`got in to /test endpoint`);
  console.log('checks for condition');
  if (req.query.name != 'cat') {
    console.log('condition passed');
      next();
      return
  } 

    console.log('condition failed');
    res.send('it was cat');
    console.log("result executed");
  
});

// app.get('/test', (req, res) => {
//   console.log('got into /test middleware');
//   res.send('it was not cat');
//   console.log("result executed");

// });

app.get('/test', (req, res) => {
  console.log('got into /test middleware');
  res.sendFile(__dirname+'/error.html');
  console.log('result executed');
});

sequelize.authenticate()
.then(() => {
  console.log('Database connection has been established successfully.');
  app.listen(port,()=>console.log("Server starts at http://localhost:5000"))
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});

