const { DataTypes, Model } = require('sequelize');
const { v4:uuidv4} =require('uuid')

  module.exports=(sequelize)=>{
    class Category extends Model {}
    
    Category.init({
      category_id: {
        type: DataTypes.UUID,
        defaultValue:()=>uuidv4(),
        primaryKey: true,
      },
      userId:{
        type:DataTypes.UUID,
        defaultValue:()=>uuidv4()
      },
      category: DataTypes.STRING,
      description:DataTypes.STRING,
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
      modelName: 'Category',
      tableName:'Categories',
      primaryKey:'category_id',
      timestamps:false,
      defaultScope:{
          attributes:{ exclude:['id','createdAt','updatedAt','ProductId'] }
        }
    })
    Category.associate = (models) => {
      Category.hasMany(models.Product, {foreignKey:'category_id',as:'Products',targetKey:'category_id',constraints:false});
      Category.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
      
  
    };

    return Category;
  }