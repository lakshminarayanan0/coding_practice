'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Category.hasMany(models.Product,{foreignKey:'category_id',as:'Product',targetKey:'category_id',constraints:false})

    }
  }
  Category.init({
    category_id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true,
    },
    category: DataTypes.STRING(60),
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName:'categories',
    primaryKey:'category_id',
    timestamps:false,
    defaultScope:{
        attributes:{ exclude:['id','createdAt','updatedAt','ProductId'] }
      }
  });
  return Category;
};