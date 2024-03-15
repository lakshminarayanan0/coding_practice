'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
  
    static associate(models) {
      Customer.hasMany(models.Transactions,{foreignKey:'customer_id',as:'Transactions',targetKey:'customer_id',constraints:false})

    }
  }
  Customer.init({
    customer_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    first_name: DataTypes.STRING(50),
    last_name: DataTypes.STRING(50),
    phone: DataTypes.STRING(15),
    mail: DataTypes.STRING(100),
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
    tableName:'customers',
    primaryKey:'customer_id',
    timestamps:false,
    defaultScope:{
      attributes:{exclude:['id','updatedAt','createdAt']}
    }
  });
  return Customer;
};