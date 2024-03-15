const {Router}=require('express');
const { getTransactions, getPurchaseDetails, getTransactionDetailsById, addNewCustomerWithPurchases } = require('../controller');
const router=new Router();


router.get('/',getTransactions)
router.get('/purchases',getPurchaseDetails)
router.get('/transactions/by/cust/id/:id',getTransactionDetailsById)
router.post('/new',addNewCustomerWithPurchases)

module.exports.transactionRouter=router;