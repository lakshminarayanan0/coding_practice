const {Router}=require('express')
const router=new Router();
const { unsoldProductsThisMonth, mostSoldProductsThisMonth, mostPurchasesThisMonth, revenueByElectronics, topSalesToday, salesOver50000, soldOver500 } = require('../filterQueries.js');


router.get('/unsold',unsoldProductsThisMonth)
router.get('/mostsold',mostSoldProductsThisMonth)
router.get('/topsalesthismonth',mostPurchasesThisMonth)
router.get('/electronicsrev',revenueByElectronics)
router.get('/topsalestoday',topSalesToday)
router.get('/over50000',salesOver50000)
router.get('/over500',soldOver500)
//over500 and electronics not queried properly

module.exports.filterRouter=router