const express=require('express')
 const app=express()

 app.get('/',(req,res)=>res.status(200).send("<h1>Appsail</h1>"))

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT | 3060, () => {
    console.log("Server Started at "+`http://localhost:9000`)
})
