
const { Model, DataTypes } = require('sequelize')
const {v4:uuidv4}=require('uuid')

  module.exports=(sequelize)=>{
    class Transaction extends Model{}

Transaction.init({
  transaction_id: {
    type: DataTypes.UUID,
    defaultValue:()=>uuidv4(),
    primaryKey: true,
  },
  userId:{
    type:DataTypes.UUID,
    defaultValue:uuidv4()
  },    
  customer_id: DataTypes.UUID,
  transaction_date: {
   type:DataTypes.DATE,
   defaultValue:DataTypes.NOW
  },
  total_amount: DataTypes.DECIMAL(10,2),
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, 
{
  schema: "records",
  sequelize,
  timestamps:false,
  defaultScope:{
 attributes:{exclude:['id','createdAt','updatedAt']}
  },
  modelName: 'Transaction',
  tableName:'Transactions',
  primaryKey:'transaction_id'
})

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Customer, {foreignKey:'customer_id',as:'Customers',targetKey:'customer_id',constraints:false});
    Transaction.hasMany(models.Purchase, {foreignKey:'transaction_id',as:'Purchases',targetKey:'transaction_id',constraints:false});
    Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
   

  };

  return Transaction;
  }
