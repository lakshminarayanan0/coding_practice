const {Router}=require('express');
const { fetchData, fetchProductById, updateProduct, createProduct, deleteProduct } = require('../controller');
const router=new Router();



router.get('/',fetchData)
router.get('/:id',fetchProductById)
router.put('/:productId', updateProduct);
router.post('/', createProduct);
router.delete('/:productId', deleteProduct);


module.exports.productRouter=router;