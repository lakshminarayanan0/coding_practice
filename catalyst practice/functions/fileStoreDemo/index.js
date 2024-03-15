"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const fs=require('fs')

const app = express();
app.use(express.json());

app.get('/users',(req,res)=>{
	const catalystApp=catalyst.initialize(req)
	const userManagement = catalystApp.userManagement();
    userManagement.getAllOrgs().then(data=>res.json({success:true,response:data}))
})

app.post('/fs',(req,res)=>{
	let file=req.file
// let config = 
// { 
// code:Buffer.from(file,'base64'), name: 'testFile.jpg' 
// };
// let catalystApp=catalyst.initialize(req);
// let filestore = catalystApp.filestore(); 
// let folder = filestore.folder(1721000000022001); 
// let uploadPromise = folder.uploadFile(config); 
// uploadPromise.then((fileObject) => {
// console.log(fileObject);
// return res.status(200).json({success:true,fileObject}) 
// }).catch(err=>res.status(500).json({success:false,err}))
res.json(file)
})



app.all("/", (req,res) => {

	res.status(200).send("I am Live and Ready.");

});

module.exports = app;
