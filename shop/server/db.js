const { DataTypes } = require("sequelize");
const { User,sequelize } = require("./models");
const { v4: uuidv4 } = require('uuid');


async function createTenantSchema(schemaName) {
    
  await sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
}

async function defineAndSyncModels(schemaName) {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.UUID,
      defaultValue:uuidv4(),
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone:DataTypes.STRING,
    address:DataTypes.STRING
  }, {
    schema: schemaName,
  },
  {
    sequelize,
    modelName: 'Customer',
    tableName:'customers',
    primaryKey:'customer_id',
    timestamps:false,
    defaultScope:{
      attributes:{exclude:['id','updatedAt','createdAt']}
    }
  });

  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.UUID,
      defaultValue:uuidv4(),
      primaryKey: true,
    },
    name: DataTypes.STRING,
    category_id: DataTypes.UUID,
    stock_quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
  
  }, {
    schema: schemaName,
  },{
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false, 
  });

  const Purchase = sequelize.define('Purchase', {
    purchase_id: {
      type: DataTypes.UUID,
      defaultValue:uuidv4(),
      primaryKey: true,
    },
    transaction_id: DataTypes.UUID,
    product_id: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL(10,2)
  }, {
    schema: schemaName,
  },{
    
        sequelize,
        modelName: 'Purchase',
        tableName:'purchases',
        timestamps:false,
        primaryKey:'purchase_id',
        defaultScope:{
          attributes:{exclude:['createdAt','updatedAt']}
        }
      
  });

  const Transaction = sequelize.define('Transaction', {
    transaction_id: {
      type: DataTypes.UUID,
      defaultValue:uuidv4(),
      primaryKey: true,
    },
    customer_id: DataTypes.UUID,
    transaction_date: DataTypes.DATE,
    total_amount: DataTypes.DECIMAL(10,2)
  }, {
    schema: schemaName,
  },
  {
    sequelize,
    timestamps:false,
    defaultScope:{
   attributes:{exclude:['createdAt','updatedAt']}
    },
    modelName: 'Transaction',
    tableName:'transactions',
    primaryKey:'transaction_id'
  });

  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.UUID,
      defaultValue:uuidv4(),
      primaryKey: true,
    },
    category: DataTypes.STRING,
    description:DataTypes.STRING

  }, {
    schema: schemaName,
  },
  {
    sequelize,
    modelName: 'Category',
    tableName:'categories',
    primaryKey:'category_id',
    timestamps:false,
    defaultScope:{
        attributes:{ exclude:['id','createdAt','updatedAt','ProductId'] }
      }
  });

  Customer.hasMany(Transaction, {foreignKey:'customer_id',as:'Transactions',targetKey:'customer_id',constraints:false});
  Transaction.belongsTo(Customer, {foreignKey:'customer_id',as:'Customer',targetKey:'customer_id',constraints:false});
  Product.hasMany(Purchase, { foreignKey: 'product_id', as: 'Purchases' ,targetKey: 'product_id'});
  Purchase.belongsTo(Product, {foreignKey:'product_id',as:'Product',targetKey:'product_id',constraints:false});
  Purchase.belongsTo(Transaction,{foreignKey:'transaction_id',as:'Transactions',targetKey:'transaction_id',constraints:false})
  Transaction.hasMany(Purchase, {foreignKey:'transaction_id',as:'Purchases',targetKey:'transaction_id',constraints:false});
  Product.belongsTo(Category, { foreignKey: 'category_id', as: 'Categories', targetKey: 'category_id', constraints: false });

  await Customer.sync();
  await Product.sync();
  await Purchase.sync();
  await Transaction.sync();
  await Category.sync();
}


async function signUpUser(username, password, email, phone) {
    let transaction;
    
    try {
      transaction = await sequelize.transaction();
  
      const user = await User.create({
        username,
        email,
        phone,
        password,
      }, { transaction });
  
      const schemaName = `user_${user.userId}`;
      const changedName=schemaName.replace(/-/g, '_');
      await createTenantSchema(changedName, transaction);
      await defineAndSyncModels(changedName, transaction);
      await sequelize.query(`SET LOCAL search_path TO ${changedName}`, { transaction });

      await transaction.commit();
  
      return user;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

module.exports={
    signUpUser
}
