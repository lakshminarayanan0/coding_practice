'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseDetails extends Model {
    
    static associate(models) {
      PurchaseDetails.belongsTo(models.Product,{foreignKey:'product_id',as:'Product',targetKey:'product_id',constraints:false});
      PurchaseDetails.belongsTo(models.Transactions,{foreignKey:'transaction_id',as:'Transactions',targetKey:'transaction_id',constraints:false})
    }
  }
  PurchaseDetails.init({
    purchase_id:{
   type: DataTypes.INTEGER,
   primaryKey:true,
   autoIncrement:true
    },
    transaction_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    modelName: 'PurchaseDetails',
    tableName:'purchase_details',
    timestamps:false,
    primaryKey:'purchase_id',
    defaultScope:{
      attributes:{exclude:['createdAt','updatedAt']}
    }
  });
  return PurchaseDetails;
};