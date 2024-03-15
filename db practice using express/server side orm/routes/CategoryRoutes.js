const {Router}=require('express');
const { fetchCategories, createCategory, updateCategory, deleteCategory, getCategoryByID } = require('../controller');
const router=new Router();


router.get('/',fetchCategories)
router.get('/:id',getCategoryByID)
router.post('/',createCategory)
router.put('/:id',updateCategory)
router.delete('/:id',deleteCategory)

module.exports.categoryRouter=router;