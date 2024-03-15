const express=require('express')
const session=require('express-session')
const bodyParser=require('body-parser')
const cors=require('cors');
const cookieParser=require('cookie-parser')
// const RedisStore=require('connect-redis').default;
const { signIn, unsoldProductsThisMonth, addCategory, addProduct, addCustomer, addPurchases, getCustomers, getProducts, revenueByElectronics, topsalesToday, mostSoldThisMonth, mostSoldOver500, topSalesByCustomerThisMonth, topSalesByCustomerThisMonthOver50000, logout } = require('./filterQueries');
// const { sequelize } = require('./models');
// const { createClient } = require('redis');
// const SequelizeStore =require('connect-session-sequelize')(session.Store)
const app=express()

// let redisClient = createClient()
// redisClient.connect().catch(console.error)

// let redisStore = new RedisStore({
//   client: redisClient,
//   prefix: "myapp:",
// })

// const store = new SequelizeStore({
//   db: sequelize,
//   table: 'sessions',
//   extendDefaultFields: (defaults, session) => ({
//     expires: session.cookie.expires,
//     data: defaults.data,
//   }),
// });

// // Specify the schema for the SequelizeStore
// store.schema = 'tenants';

app.use(
  session({
    name:"user_sid",
    // store:redisStore,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite:true, 
      httpOnly: true,
      maxAge: 3600000, 
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin:[ 'http://localhost:3000','http://localhost:3001'],  
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())



const checkLogin=(req,res,next)=>{
console.log("checking ...");
console.log(req.session);  
  console.log(req.session.user);  
if(!req.session || !req.session.user){
    console.log("user not found or authenticated!");
    return res.redirect('/signin')
  }
  console.log("user found or authenticated");
  next()
}



const checkLoginAlready = async (req, res, next) => {
  console.log("Checking ...");
  console.log(req.body);

  if(req.session && req.session.user){
  return res.redirect('/')
   
  }
  next()

  
};



app.get('/home',checkLogin,(req,res)=>{
  if(req.session && req.session.user){

    console.log(req.session);
    const user=req.session.user
  res.send(`
  <body>
    <h1>Dashboard</h1>
    <h3>Welcome ${user.username}</h3>

    <ul>
        <li>username: ${user.username}</li>
        <li>username: ${user.phone}</li>
        <li>username: ${user.email}</li>

    </ul>

    <button onclick="logout()">log out</button>

    <div>
        <button onclick="getData(event)" data-func="mostsold">most sold</button>
        <button onclick="getData(event)" data-func="unsold">unsold</button>
        <button onclick="getData(event)" data-func="over500">over 500</button>
        <button onclick="getData(event)" data-func="over50000">over50000</button>
        <button onclick="getData(event)" data-func="topsalestoday">top sales today</button>
        <button onclick="getData(event)" data-func="topsalesbycustomer">top sales (month)</button>
        <button onclick="getData(event)" data-func="electronics">electronics</button>

    </div>
    <div class="container">
       
    </div>

    <script>
        function getData(e){
            const list=["unsold","electronics","topsalestoday","mostsold","over500","over50000","topsalesbycustomer"]
            let inp=e.target.getAttribute("data-func");
            list.forEach(item=>{
                if(inp===item){
                    fetch("http://localhost:8000/"+item)
                    .then(res=>{
                        if(res.ok){
                           return res.json()
                        }
                    })
                    .then(data=>{
                        const con=document.querySelector(".container")
                        con.innerHTML=""
                        data.forEach(item=>{
                          con.innerHTML+=JSON.stringify(item)
                          con.innerHTML+='<br>'
                        })

                    }).catch(err=>console.log(err))
                }
            })

        }


        function logout(){
              fetch("http://localhost:8000/logout")
              .then(res=>res.json())
              .then(data=>{
                console.log(data);
                window.location.href='/signin';
              }).catch(err=>{
                console.log(err);
              })

        }
    </script>
    </body>
  `)
  }
})

app.post('/signin',checkLoginAlready, signIn);

app.get('/signin',(req,res)=>{
 return res.send(` <body>
 <form method="post" action="/signin">
     <input type="text" name="username" placeholder="Enter username"><br>
     <input type="password" name="password" placeholder="Enter password"><br>
     <input type="submit" value="sign in">
 </form>
</body>`)
})
  
app.post('/addcategory', addCategory);

app.post('/addproduct',addProduct)
  
app.post('/addcustomer',addCustomer)

app.post('/addpurchases',addPurchases)

app.get('/customers',getCustomers)

app.get('/products',getProducts)

app.get('/unsold',checkLogin,unsoldProductsThisMonth)

app.get('/electronics',checkLogin,revenueByElectronics)

app.get('/topsalestoday',checkLogin,topsalesToday)

app.get('/mostsold',checkLogin,mostSoldThisMonth)

app.get('/over500',checkLogin,mostSoldOver500)

app.get('/topsalesbycustomer',checkLogin,topSalesByCustomerThisMonth)

app.get('/over50000',checkLogin,topSalesByCustomerThisMonthOver50000)

app.get("/logout",checkLogin, logout);

  
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

