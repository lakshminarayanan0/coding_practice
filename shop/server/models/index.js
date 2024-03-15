const { Sequelize, DataTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const UsersModel = require('./User');
const CustomerModel = require('./Customer');
const TransactionModel = require('./Transaction');
const ProductModel = require('./Product');
const PurchaseModel = require('./Purchase');
const CategoryModel = require('./Category');
const SessionModel= require('./Session')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const models = {
  User: UsersModel(sequelize),
  Customer: CustomerModel(sequelize),
  Product: ProductModel(sequelize),
  Purchase: PurchaseModel(sequelize),
  Transaction: TransactionModel(sequelize),
  Category: CategoryModel(sequelize),
  Session:SessionModel(sequelize)
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

const db = {
  sequelize,
  Sequelize,
  ...models,
};

module.exports = db;
