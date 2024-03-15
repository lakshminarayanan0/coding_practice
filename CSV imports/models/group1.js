'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group1 extends Model {
  
    static associate(models) {
      // Group.hasMany(models.Employment,{foreignKey:"group_id",as:"Employment",constraints:false,targetKey:"group_id"})
    }
  }
  Group1.init({
    group_id:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true,
      allowNull:false
    },
    group_name: {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Group1',
    tableName:'group1',
    timestamps:false
  });
  return Group1;
};