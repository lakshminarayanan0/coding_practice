const { getCustomersList, createCustomer ,getCustomerByID, updateCustomer,deleteCustomer} = require("../controller");
const {Router}=require('express');
const router=new Router();


router.get('/',getCustomersList)
router.get('/:id',getCustomerByID)
router.post('/',createCustomer)
router.put('/:id',updateCustomer)
router.delete('/:id',deleteCustomer)






module.exports.customerRouter=router;