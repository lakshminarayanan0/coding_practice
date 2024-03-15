const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer"
    },
    purchased_amount:Number,
    date_of_transaction:Date

},{collection:'transactions'})

const Transaction=mongoose.model('Transaction',transactionSchema)

module.exports=Transaction