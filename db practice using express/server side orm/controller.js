// const { Sequelize } = require("sequelize");
const { Product, Category, sequelize, Customer, Transactions, PurchaseDetails } = require("./models");

//operations on products
function fetchData(req, res, next) {
    Product.findAll({
      include: [
        {
          model: Category,
          attributes: [],
          as: 'Category',
        },
      ],
      attributes: [
        'product_id',
        'name',
        'stock_quantity',
        'price',
        [sequelize.col('Category.category_id'), 'category_id'],
        [sequelize.col('Category.category'), 'category'],
      ],
      order: [['product_id', 'asc']],
      raw: true, 
    })
      .then((products) => res.json(products))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ mesg: 'Internal server error!' });
      });
  }
  
  function fetchProductById(req, res, next) {
    Product.findOne({
      include: [
        {
          model: Category,
          attributes: [],
          as: 'Category',
        },
      ],
      attributes: [
        'product_id',
        'name',
        'stock_quantity',
        'price',
        [sequelize.col('Category.category_id'), 'category_id'],
        [sequelize.col('Category.category'), 'category'],
      ],
      where:{
        product_id:req.params.id,
      },
      order: [['product_id', 'asc']],
      raw: true, 
    })
      .then((products) => {
      if(products)
       {
        res.json(products)
       }
      else
      {
        res.json({response:"no product available with id:"+req.params.id})
      }
      // if(!products)
      // {
      //   res.json({response:"no product available with id:"+req.params.id})
      // }
      // console.log(products);
      // res.json(products)

      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ mesg: 'Internal server error!' });
      });
  }
  

  
    function updateProduct(req, res, next) {
      const productId = req.params.productId;
      const { name, stock, price, category_id } = req.body;
    
      Product.update(
        {
          name,
          stock_quantity:stock,
          price,
          category_id,
        },
        {
          where: {
            product_id: productId,
          },
          returning: true,
        }
      )
        .then(([rowsUpdated, [updatedRecord]]) => {
          // console.log(rowsUpdated);
          if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'Product not found' });
          }
    
          Product.findByPk(updatedRecord.product_id, {
            include: [{ model: Category, as: 'Category' }],
          })
            .then((updatedProduct) => {
              const { category } = updatedProduct.Category;
              const result = {
                ...updatedProduct.toJSON(),
                category,
              };
    
              console.log('Updated successfully');
              res.json(result);
            })
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: 'Internal server error!' });
        });
    }
    
    
  function createProduct(req, res, next) {

    const { name, stock, price, category} = req.body;
    console.log(name,stock,price,category);
    Product.create({
      name,
      stock_quantity:stock,
      price,
      category_id:category,
    })
    .then(product=>{
      return Category.findByPk(category,{attributes:['category']})
      .then(associatedCategory=>{
        console.log("Product created successfully");
        const productData = product.get({ plain: true });
        const categoryData = associatedCategory.get({ plain: true });
        res.json({
          ...productData,
          ...categoryData
        });
      })
    })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error!' });
      });
  }
  
 
  function deleteProduct(req, res, next) {
    const productId = req.params.productId;
  
    Product.destroy({
      where: {
        product_id: productId,
      },
    })
      .then((rowsDeleted) => {
        if (rowsDeleted === 1) {
          console.log("Product deleted successfully");
          res.json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error!' });
      });
  }
  
//operations on customers
  function getCustomersList(req,res,next){
      Customer.findAll()
      .then(customers=>res.json(customers))
    .catch(err=>{
      console.log(err);
      res.status(500).json({mesg:"Internal server error!"})
  
    })

  }

  function createCustomer(req,res,next){
    const {first_name,last_name,phone,mail,address}=req.body;

    Customer.create({
      first_name,
      last_name,
      phone,
      mail,
      address
    })
    .then(newCustomer=>{
      res.json(newCustomer)
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg:"Internal server error!"})
    })
  }

  function getCustomerByID(req,res,next){
    const customer_id=req.params.id
   Customer.findOne({
    where:{
     customer_id:customer_id
    }
   })
   .then(customer=>{
    if(!customer){
      res.json({msg:"Customer not found"})
    }
    res.json(customer)
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({msg:"Internal server error"})
   })
  }
  
  function updateCustomer(req,res,next){
    const customer_id=req.params.id;
    const {first_name,last_name,phone,mail,address}=req.body;

    Customer.update({
      first_name,
      last_name,
      phone,
      mail,
      address
    },
    {
      where:{
        customer_id:customer_id,
      },
      returning:true
    })
    .then(([rowsUpdated,[updatedCustomer]])=>{
      if (rowsUpdated === 0) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(updatedCustomer);
      console.log("Customer with "+customer_id+" updated successfuly.");
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg:"Internal server error!"})
    })
  }


  function deleteCustomer(req,res,next){
    const customer_id=req.params.id;
    Customer.destroy({where:{customer_id}})
    .then(rowsDeleted=>{
      if(rowsDeleted===1){
        res.json({msg:"Customer with "+customer_id+" deleted successfully."})
      }
      res.json({msg:"Customer not found ! "})
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({msg:"Internal server error!"})

    })
  }

  //operations on transactions
  function getTransactions(req, res, next) {
    Transactions.findAll({
      include: [
        {
          model: Customer,
          as: 'Customer',
        },
      ],
      order: ['transaction_id'],
    })
      .then((transactions) => {
        const formattedTransactions = transactions.map((transaction) => ({
          transaction_id: transaction.transaction_id,
          customer_id: transaction.customer_id,
          transaction_date: transaction.transaction_date,
          total_amount: transaction.total_amount,
          first_name: transaction.Customer.first_name,
          last_name: transaction.Customer.last_name,
          phone:transaction.Customer.phone,
          mail:transaction.Customer.mail,
          address:transaction.Customer.address

        }));
        res.json(formattedTransactions);
      })
      .catch((err) => {
        console.error('Error: ', err);
        res.status(500).json({ msg: 'Internal server Error!' });
      });
  }
  

  function getTransactionDetailsById(req,res,next){
    const id=req.params.id
    Transactions.findAll({
      include:
     [ {
      model:PurchaseDetails,
      as:'PurchaseDetails',
      on:sequelize.literal('"PurchaseDetails"."transaction_id"="Transactions"."transaction_id"'),
      attributes:['product_id','quantity','subtotal'],
      include:[{
        model:Product,
        as:'Product',
        on:sequelize.literal('"PurchaseDetails->Product"."product_id"="PurchaseDetails"."product_id"'),
        attributes:['name','price']
      }]
      }
      ],
      where:{
        customer_id:id
      }
    }).then(transactions=>{
      res.json(transactions)
    }).catch(err=>{
      console.error("Error: ",err);
     res.status(500).json({msg:'Internal server Error!'})
    })
  }

  function getPurchaseDetails(req,res,next){
    const id=req.params.id
    PurchaseDetails.findAll()
    .then(purchases=>res.json(purchases))
    .catch(err=>{
     console.error("Error: ",err);
     res.status(500).json({msg:'Internal server Error!'})
    })
 }


//operations on categories

 function fetchCategories(req,res,next){
  
  Category.findAll()
  .then(categories=>res.json(categories))
  .catch(err=>{
    console.log(err);
    res.status(500).json({mesg:"Internal server error!"})

  })
}

 function createCategory(req,res,next){
  console.log(req.body);
  const {category,description}=req.body;
  Category.create({
   category,
   description
  })
  .then(newCategory=>{
   console.log(newCategory);
   res.json(newCategory)
  })
  .catch(err=>{
   console.log(err);
   res.status(500).json({mesg:err})
  })
}

function updateCategory(req,res,next){

  const category_id=req.params.id;
  const {category,description}=req.body;

  Category.findOne({
    where: {
      category_id: category_id
    }
  })
    .then(existingCategory => {
      if (!existingCategory) {
        return res.status(404).json({ msg: 'Category not found.' });
      }
    })

  Category.update(
    {
       category,
       description
  },
  {
    where:{
      category_id:category_id
    },
    returning:true

  }
  )
  .then(category=>{
    console.log("category with id "+category_id+" updated successfully.");
    res.json(category)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({msg:err})
  })
}


function deleteCategory(req,res,next){
  const category_id = req.params.id;
  
  Category.destroy({
    where: {
      category_id: category_id,
    },
  })
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        console.log("Category with "+category_id+" deleted successfully");
        res.json({ message: "Category with "+category_id+" deleted successfully" });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error!' });
    });
}


function getCategoryByID(req,res,next){
  const category_id=req.params.id;
   Category.findOne({
     where:{
      category_id:category_id
     }
   })
   .then(category=>{
    if (!category) {
      return res.status(404).json({ msg: 'Category not found.' });
    }
    res.json(category)
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({mesg:"Internal server Error."})
   })
}


function addNewCustomerWithPurchases (req,res,next) {
  const {userData,productData}=req.body;

    let transaction;

    sequelize.transaction()
      .then((trans) => {
        transaction = trans;
        return Customer.create(userData, { transaction });
      })
      .then((customer) => {
        // console.log(transaction);
        return Transactions.create({
          customer_id: customer.customer_id,
          transaction_date: new Date(),
          total_amount: productData.reduce((total, product) => total + product.subtotal, 0),
        }, { transaction });
      })
      .then((transactionRecord) => {
        // console.log(transaction);
        return PurchaseDetails.bulkCreate(productData.map((product) => ({
          transaction_id: transactionRecord.transaction_id,
          product_id: product.product_id,
          quantity: product.quantity,
          subtotal: product.subtotal,
        })), { transaction });
      })
      .then(() => {
        // console.log(transaction);
        return transaction.commit();
      })
      .then(() => {
        res.json({message:'Transaction committed successfully!'});
      })
      .catch((error) => {
        if (transaction) transaction.rollback();

        res.status(500).json({message:`Error during transaction: ${error.message}`});
      });
 
};


  module.exports={
    fetchCategories,
    fetchData,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchProductById,
    getCustomersList,
    getTransactions,
    getPurchaseDetails,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryByID,
    createCustomer,
    getCustomerByID,
    updateCustomer,
    deleteCustomer,
    getTransactionDetailsById,
    addNewCustomerWithPurchases
    
  }