const { v4: uuidv4 } = require('uuid');
const { DataTypes, Model } = require('sequelize'); 


module.exports = (sequelize)=>{
  class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  },
  {
    sequelize, 
    timestamps: false,
    modelName: 'User',
    tableName: 'users',
    schema: 'tenants',
  }
);

User.associate = (models) => {
  User.hasMany(models.Customer, { foreignKey: 'userId', as: 'Customers' });
  User.hasMany(models.Product, { foreignKey: 'userId', as: 'Products' });
  User.hasMany(models.Purchase, { foreignKey: 'userId', as: 'Purchases' });
  User.hasMany(models.Category, { foreignKey: 'userId', as: 'Categories' });
  User.hasMany(models.Transaction, { foreignKey: 'userId', as: 'Transactions' });
  User.hasMany(models.Session, { foreignKey: 'userId', as: 'Sessions' });

};

return User;
};
