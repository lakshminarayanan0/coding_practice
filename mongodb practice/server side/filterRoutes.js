const {Router}=require('express');
const { topSalesToday, electronics, unsoldProducts, mostSoldProducts, mostSoldProductsOver500, topSalesThisMonthOver50000, topSalesThisMonth } = require('./filetrQueries');
const router=new Router();


router.get('/unsold',unsoldProducts)
router.get('/mostsold',mostSoldProducts)
router.get('/topsalesthismonth',topSalesThisMonth)
router.get('/electronicsrev',electronics)
router.get('/topsalestoday',topSalesToday)
router.get('/over50000',topSalesThisMonthOver50000)
router.get('/over500',mostSoldProductsOver500)

module.exports.filterRouter=router