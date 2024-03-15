const { Product, Category, PurchaseDetails, Transactions, sequelize, Customer } = require("./models");
const {Op}=require('sequelize')
const moment = require('moment-timezone');

function unsoldProductsThisMonth(req, res, next) {
    Product.findAll({
      attributes: ['product_id', 'name', [sequelize.col('Category.category'), 'category']],
      include: [
        {
          model: Category,
          attributes: [],
          on:sequelize.literal('"Product"."category_id"="Category"."category_id" '),
          as: 'Category',
          required:false
        },
        {
          model: PurchaseDetails,
          attributes: [],
          on:sequelize.literal('"Product"."product_id"="PurchaseDetails"."product_id" '),
          as: 'PurchaseDetails',
          include: [
            {
              model: Transactions,
              attributes: [],
              as: 'Transactions',
              on:sequelize.literal('"PurchaseDetails"."transaction_id"="PurchaseDetails->Transactions"."transaction_id" '),
              where: {
                transaction_date: {
                  [Op.and]: [
                    sequelize.literal('extract(month from "PurchaseDetails->Transactions"."transaction_date") = extract(month from current_date)'),
                    sequelize.literal('extract(year from "PurchaseDetails->Transactions"."transaction_date") = extract(year from current_date)'),
                  ],
                },
              },
            },
          ],
        },
      ],
      raw: true,
      where: {
        '$PurchaseDetails.product_id$': null,
      },
    })
      .then(products => {
        // console.log(products.length);
        res.json(products);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: err });
      });
  }
  
  
  function mostSoldProductsThisMonth(req, res, next) {
    PurchaseDetails.findAll({
      attributes: [
        [sequelize.col('Product.product_id'), 'product_id'],
        [sequelize.col('Product.name'), 'name'],
        [sequelize.fn('SUM', sequelize.col('quantity')), 'total_sold'],
      ],
      include: [
        {
          model: Product,
          as: 'Product',
          on:sequelize.literal('"PurchaseDetails"."product_id"="Product"."product_id" '),
          attributes: [],
        },
        {
          model: Transactions,
          as: 'Transactions',
          on:sequelize.literal('"PurchaseDetails"."transaction_id"="Transactions"."transaction_id" '),
          attributes: [],
          where: {
            transaction_date: {
              [Op.and]: [
                sequelize.literal('extract(month from "Transactions"."transaction_date") = extract(month from current_date)'),
                sequelize.literal('extract(year from "Transactions"."transaction_date") = extract(year from current_date)'),
              ],
            },
          },
        },
      ],
      group: ['Product.product_id'],
      order: [[sequelize.literal('total_sold DESC')]],
      having: {
        [Op.not]: [
          sequelize.where(sequelize.col('"Product"."product_id"'), null),
          sequelize.where(sequelize.col('"Product"."name"'), null),
        ],
      },
          raw: true,
      limit: 10, 
    })
      .then(products => res.json(products))
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: err });
      });
  }
  
  
  function mostPurchasesThisMonth(req,res,next){
    Transactions.findAll({
      attributes:[
        'customer_id',
        [sequelize.fn('sum',sequelize.col('total_amount')),'total_purchased'],
        [sequelize.col('Customer.first_name'),'first_name'],
        [sequelize.col('Customer.last_name'),'last_name'],

      ],
      include:[{
        model:Customer,
        as:'Customer',
        on:sequelize.literal('"Customer"."customer_id"="Transactions"."customer_id"'),
        attributes:[],
        

      }],
      where:{
        transaction_date:{
                   [Op.and]: [
                     sequelize.literal('extract(month from "Transactions"."transaction_date") = extract(month from current_date)'),
                     sequelize.literal('extract(year from "Transactions"."transaction_date") = extract(year from current_date)'),
                   ],
                 }
                 },
      raw:true,
      group:['Customer.customer_id',"Transactions.customer_id"],
      order: [[sequelize.literal('total_purchased DESC')]],
      limit:10
    })

    .then(customers=>res.json(customers))
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: err });
    });
  }

  
  function revenueByElectronics(req, res, next) {
    Product.findAll({
      attributes: [
        [sequelize.col('Product.product_id'), 'product_id'],
        [sequelize.col('Product.name'), 'name'],
        [sequelize.fn('coalesce', sequelize.fn('sum', sequelize.col('PurchaseDetails.quantity')), 0), 'total_sold'],
        [sequelize.fn('coalesce', sequelize.fn('sum', sequelize.col('PurchaseDetails.subtotal')), 0), 'total_purchased'],

      ],
      include: [
        {
          model: PurchaseDetails,
          as: 'PurchaseDetails',
            // product_id:sequelize.col('Product.product_id')
          on:sequelize.literal('"Product"."product_id" = "PurchaseDetails"."product_id"'),
        

          attributes: [],
          include: [
            {
              model: Transactions,
              as: 'Transactions',
              on:sequelize.literal('"PurchaseDetails"."transaction_id"="PurchaseDetails->Transactions"."transaction_id"'),
              attributes: [],
              where: {
                transaction_date: {
                  [Op.and]: [
                    sequelize.literal('extract(month from "PurchaseDetails->Transactions"."transaction_date") = extract(month from current_date)'),
                    sequelize.literal('extract(year from "PurchaseDetails->Transactions"."transaction_date") = extract(year from current_date)'),
                  ],
                },
              },
              required:false,
            },
          ],
          required:false,
        },
        {
          model:Category,
          as:'Category',
          on:sequelize.literal('"Product"."category_id"="Category"."category_id"'),
          attributes:[],
          where: {
            category: 'electronics',
          }
        }
      ],
      group: ['Product.product_id','Category.category_id'],
      order: [[sequelize.literal('total_purchased DESC')]],
    })
      .then((products) => res.json(products))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: err });
      });
  }
  
  
  function topSalesToday(req,res,next){
    Transactions.findAll({
      attributes:[
        [sequelize.col('Transactions.transaction_id'),'transaction_id'],
        [sequelize.col('Customer.first_name'),'first_name'],
        [sequelize.col('Customer.last_name'),'last_name'],
        [sequelize.fn('sum',sequelize.col('Transactions.total_amount')),'total_amount'],
      ],
      include:[{
        model:Customer,
        as:'Customer',
        on:sequelize.literal('"Customer"."customer_id"="Transactions"."customer_id" '),
        attributes:[]
      },
    ],
    where: {
      transaction_date: {
        [Op.between]: [
          moment('2023-11-01').startOf('day').format(),
          moment('2023-11-01').endOf('day').format(),
        ],
      },
    },
    group: ['Transactions.transaction_id', 'Customer.first_name', 'Customer.last_name'],
    order: [[sequelize.literal('total_amount DESC')]],
    limit:10
    })
    .then(customers=>res.json(customers))
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: err });
    });
  }
  
  function salesOver50000(req,res,next){
  
   
    Transactions.findAll({
      attributes:[
        [sequelize.col('Transactions.customer_id'),'customer_id'],
        [sequelize.col('Customer.first_name'),'first_name'],
        [sequelize.col('Customer.last_name'),'last_name'],
        [sequelize.fn('sum',sequelize.col('Transactions.total_amount')),'total_amount'],
      ],
      include:[{
        model:Customer,
        as:'Customer',
        on:sequelize.literal('"Customer"."customer_id"="Transactions"."customer_id"'),
        attributes:[]
      },
    ],
    where: {
      transaction_date: {
        [Op.and]: [
          sequelize.literal('extract(month from "Transactions"."transaction_date") = extract(month from current_date)'),
          sequelize.literal('extract(year from "Transactions"."transaction_date") = extract(year from current_date)'),
        ],
      },
    },
    group: ['Transactions.customer_id', 'Customer.first_name', 'Customer.last_name'],
    having: sequelize.literal('sum(total_amount) > 50000'),
    order: [[sequelize.literal('total_amount DESC')]],
    limit:10
    })
    .then(customers=>res.json(customers))
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: err });
    });
  }
  
  function soldOver500(req, res, next) {
    Product.findAll({
      attributes: [
        [sequelize.col('Product.product_id'), 'product_id'],
        [sequelize.col('Product.name'), 'name'],
        [sequelize.col('Category.category'), 'category'],
        [sequelize.fn('sum', sequelize.col('PurchaseDetails.quantity')), 'total_sold']
      ],
      include: [
        {
          model: Category,
          as: 'Category',
          on:sequelize.literal('"Category"."category_id"="Product"."product_id"'),
          attributes: []
        },
        {
          model: PurchaseDetails,
          as: 'PurchaseDetails',
          on: sequelize.literal('"Product"."product_id" = "PurchaseDetails"."product_id"'),
          attributes: [],
          include: [
            {
              model: Transactions,
              as: 'Transactions',
              on:sequelize.literal('"PurchaseDetails->Transactions"."transaction_id"="PurchaseDetails"."transaction_id"'),
              attributes: [],
              where: {
                [Op.and]: [
                  sequelize.literal('extract(month from "PurchaseDetails->Transactions"."transaction_date") = extract(month from current_date)'),
                  sequelize.literal('extract(year from "PurchaseDetails->Transactions"."transaction_date") = extract(year from current_date)')
                ]
              }
            }
          ]
        }
      ],
      group: ['Product.product_id','Category.category'],
      having: sequelize.literal('sum("PurchaseDetails"."quantity") > 500'),
      order: [sequelize.literal('sum("PurchaseDetails"."quantity") DESC')],
      limit:10
    })
      .then(products => res.json(products))
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: err });
      });
  }
  


  module.exports={
    unsoldProductsThisMonth,
    mostSoldProductsThisMonth,
    mostPurchasesThisMonth,
    revenueByElectronics,
    topSalesToday,
    salesOver50000,
    soldOver500
  }