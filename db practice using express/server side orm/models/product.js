'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'Category', targetKey: 'category_id', constraints: false });
      Product.belongsTo(models.PurchaseDetails, { foreignKey: 'product_id', as: 'PurchaseDetails' });
    }
  }

  Product.init({
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING(60),
    category_id: DataTypes.INTEGER,
    stock_quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false, 
    updatedAt: 'updatedAt', 
    createdAt: false, 
  });

  return Product;
};
