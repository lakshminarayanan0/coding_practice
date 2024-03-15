const mongoose  = require("mongoose");


const customerSchema=new mongoose.Schema({
    first_name:String,
    last_name:String,
    phone:String,
    mail:String,
    address:String
},{collation:"customers"})

const Customer=mongoose.model('Customer',customerSchema)

module.exports=Customer;