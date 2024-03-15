const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports=(sequelize)=>{
    class Product extends Model {}

Product.init({
  product_id: {
    type: DataTypes.UUID,
    defaultValue:()=>uuidv4(),
    primaryKey: true,
  },
  userId:{
    type:DataTypes.UUID,
    defaultValue:uuidv4()
  },    
  name: DataTypes.STRING,
  category_id: DataTypes.UUID,
  stock_quantity: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(10, 2),
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
  modelName: 'Product',
  tableName: 'Products',
  timestamps: false, 
  defaultScope:{
    attributes:{exclude:['id','updatedAt','createdAt']}
  }
})
    
  Product.associate = (models) => {
    Product.hasMany(models.Purchase, {foreignKey:'product_id',as:'Purchases',targetKey:'product_id',constraints:false});
    Product.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'Categories', targetKey: 'category_id', constraints: false });


  };

  return Product
  }