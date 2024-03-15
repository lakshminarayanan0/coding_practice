const { Model, DataTypes } = require('sequelize')
const {v4:uuidv4}=require('uuid')

  module.exports=(sequelize)=>{
    class Purchase extends Model {}
      
    Purchase.init({
      purchase_id: {
        type: DataTypes.UUID,
        defaultValue:()=>uuidv4(),
        primaryKey: true,
      },
      userId:{
        type:DataTypes.UUID,
        defaultValue:uuidv4()
      },    
      transaction_id: DataTypes.UUID,
      product_id: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
      subtotal: DataTypes.DECIMAL(10,2),
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
          modelName: 'Purchase',
          tableName:'Purchases',
          timestamps:false,
          primaryKey:'purchase_id',
          defaultScope:{
            attributes:{exclude:['id','createdAt','updatedAt']}
          }
    })
  
    Purchase.associate = (models) => {
      Purchase.belongsTo(models.Product, {foreignKey:'product_id',as:'Products',targetKey:'product_id',constraints:false});
      Purchase.belongsTo(models.Transaction,{foreignKey:'transaction_id',as:'Transactions',targetKey:'transaction_id',constraints:false})
      Purchase.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
     
  
    };
    return Purchase
  }
