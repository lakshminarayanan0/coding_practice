const {v4:uuidv4}=require('uuid');
const { DataTypes, Model } = require('sequelize'); 


  module.exports=(sequelize)=>{
    class Customer extends Model {}

    Customer.init(
      {
      customer_id: {
        type: DataTypes.UUID,
        defaultValue:()=>uuidv4(),
        primaryKey: true,
      },
      userId:{
        type:DataTypes.UUID,
        defaultValue:uuidv4()
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone:DataTypes.STRING,
      address:DataTypes.STRING,
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
      modelName: 'Customer',
      tableName:'Customers',
      primaryKey:'customer_id',
      timestamps:false,
      defaultScope:{
        attributes:{exclude:['id','updatedAt','createdAt']}
      }
    })
    
    
      Customer.associate = (models) => {
        Customer.hasMany(models.Transaction, {foreignKey:'customer_id',as:'Transactions',targetKey:'customer_id',constraints:false});
        Customer.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    
      };
    
      return Customer;
    
  }
