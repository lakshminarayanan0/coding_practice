'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
   
    static associate(models) {
      Transactions.belongsTo(models.Customer,{foreignKey:'customer_id',as:'Customer',targetKey:'customer_id',constraints:false})
      Transactions.hasMany(models.PurchaseDetails,{foreignKey:'transaction_id',as:'PurchaseDetails',targetKey:'transaction_id',constraints:false})

    }
  }
  Transactions.init({
    transaction_id: {
     type:DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true
    },
    customer_id: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    total_amount: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    timestamps:false,
    defaultScope:{
   attributes:{exclude:['createdAt','updatedAt']}
    },
    modelName: 'Transactions',
    tableName:'transactions',
    primaryKey:'transaction_id'
  });
  return Transactions;
};