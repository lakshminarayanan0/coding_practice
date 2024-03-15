const {Router} =require('express');
const router=new Router();
const controller=require('./controller')

router.get('/1',controller.getTodayTopSales);
router.get('/2',controller.getTopSalesThisMonth)
router.get('/3',controller.getMostSoldProductsThisMonth)
router.get('/4',controller.getUnsoldProductsThisMonth)
router.get('/5',controller.getRevenueByElectronicsThisMonth)
router.get('/6',controller.getProductsSoldOver500ThisMonth)
router.get('/7',controller.getCustomersPurchasedMoreThan5000ThisMonth)
router.get('/products',controller.getProducts);

router.post('/products',controller.postProduct)
router.delete('/products/:id',controller.deleteProduct)
router.put('/products/:id',controller.editProduct)
router.get('/products/:id',controller.getProductById)
router.get('/categories',controller.getCategories)


module.exports=router