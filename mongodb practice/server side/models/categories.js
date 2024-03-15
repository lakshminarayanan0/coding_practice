const mongoose=require('mongoose')

const categoriesSchema=new mongoose.Schema({
    category:String,
    description:String
},{collection:'categories'})

const Category=mongoose.model('Category',categoriesSchema)

module.exports= Category