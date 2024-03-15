

const { Sequelize, DataTypes } = require('sequelize');
const ProductModel = require('./product');
const CategoryModel = require('./category');
const CustomerModel=require('./customer')
const TransactionsModel=require('./transactions')
const PurchaseDetailsModel=require('./purchasedetails')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: query=>console.log(query)
});


const models = {
  Product: ProductModel(sequelize, DataTypes),
  Category: CategoryModel(sequelize, DataTypes),
  Customer:CustomerModel(sequelize,DataTypes),
  Transactions:TransactionsModel(sequelize,DataTypes),
  PurchaseDetails:PurchaseDetailsModel(sequelize,DataTypes)
};

// Call associate function to set up associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the models and Sequelize instance
module.exports = {
  sequelize,
  ...models,
  db
};
