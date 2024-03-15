const mongoose=require('mongoose')

const purchasesSchema=new mongoose.Schema({
    transaction_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction"
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity_purchased:Number,
    subtotal:Number


},{collection:'purchases'})

const Purchase=mongoose.model('Purchase',purchasesSchema)

module.exports=Purchase