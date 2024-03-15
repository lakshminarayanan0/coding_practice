const express=require('express')
const app=express()
const session=require('express-session')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')

app.use(fileUpload())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:3600,
        secure:false,
        sameSite:true
    }
}))

const users=[
    {username:"Nana",password:"pass",data:{ skill:["software development","cricket","psycopath"],languages:["Tamil","English"],isMarried:false}},
    {username:"Balaji",password:"pass",data:{ skill:["Frontend development","Fictional writer","serial killer"],languages:["Tamil","Dutch","English"],isMarried:true}},
    {username:"Hari",password:"pass",data:{ skill:["Bussiness development","Stock market","Familyman"],languages:["Urudu","English"],isMarried:true}}

]
const checkAlreadyLoggedIn = (req, res, next) => {
    console.log("user: ",req.session.username);
    if (req.session.username) {
        return res.redirect('/');
    }
    next();
};
const checkNotLoggedIn = (req, res, next) => {
    if (!req.session.username) {
        return res.redirect('/login');
    }
    next();
};

const checkLogin = (req, res, next) => {
    if (!req.session || !req.session.username) {
        return res.redirect('/login');
    }
    next();
};


app.get('/',checkNotLoggedIn,(req,res)=>{
    console.log("session at home",req.session);
    return res.send(`<h1>Express session</h2><br><h3>welcome ${req.session.username}</h3><br><br><button onclick='redirectToGetData()'>get data</button><script>
    function redirectToGetData() {
        window.location.href = '/getdata';
    }
</script>`)
})

app.get('/getdata',checkLogin,(req,res)=>{
    console.log("into get data");
    if(req.session){
        const username=req.session.username
        const userData=users.find(user=>user.username===username)
        console.log(username,userData);
        if(userData){
          return  res.send(`<div>${JSON.stringify(userData.data)}</div>`)
        }
    }else{

       return res.status(500).send("Internal server error")
    }
})

app.post('/login',checkAlreadyLoggedIn,(req,res)=>{
    console.log("session at post login",req.session);

    // console.log("here ...with payloads");
    const {username,password}=req.body

    // console.log(req.body);
    // if(req.session.username===username){

    // }
   const isAuth=users.find(user=>{
    // console.log(user);
   return user.username===username && user.password===password
   })
   console.log(isAuth);
   if(isAuth){
    req.session.username=username
    console.log("username: ",username," is in req.session");
    return res.redirect('/')
   }
})

app.get('/login',checkAlreadyLoggedIn,(req,res)=>{
    console.log("session at get login ",req.session);
   return res.send('<form method="post" action="/login"><input name="username" type="text" placeholder="Enter username"/><input name="password" type="password" placeholder="Enter password"/><input type="submit" value="submit"/></form>')
})

app.post('/fs', (req,res)=>{
    const image=req.files.image
    console.log(image.data);
})

app.listen(4000,()=>{
    console.log("running on http://localhost:"+4000);
})