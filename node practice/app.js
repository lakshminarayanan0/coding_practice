//function greet(name){console.log("Hello "+name);}greet("Narayanan");
//const log=require("./logger");
//log.greet("Balaji");

//const path=require("path");
//console.log(path.parse(__filename));

// const os=require('os');
// console.log(os.platform());
// console.log(os.arch());
// console.log(os.homedir());



// import { Person } from "./logger.js";
// const { Person } = require("./logger.js");


// const person=new Person();
// person.on("person",data=>console.log("called Listener: ",data))
// person.greet("Narayanan",22);
// person.greet("Balaji",22);
// person.greet("Tamilarasan",22);




// import fs from 'fs';
// import http from 'http';
// import path, { dirname } from 'path';


// var getdata;


// fs.readFile('app.js','utf8',(err,data)=>{
//     if(!err) getdata=data
//     else console.log(err);
// })
// console.log("prints on server");





const http = require('http');
const { eventHandler } = require('./routes');

http.createServer(eventHandler).listen(4000);


// fs.writeFile('xample.txt',"Member of parliament",(err)=>{
//     if(!err){

//         console.log("File created successfuly...")
//         fs.appendFile('xample.txt'," appended something...",(err)=>{
//             if(!err){
//                 console.log('Appended success fully');
//                 fs.unlink('xample.txt',err=>{
//                     if(!err)
//                     console.log('deleted successfuly...');
//                 })
//             }else throw err;
//         })
//     }else  throw err ;

// })

