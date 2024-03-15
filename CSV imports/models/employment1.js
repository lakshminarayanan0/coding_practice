'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employment1 extends Model {
    static associate(models) {
      // define association here
    }
  }
  Employment1.init({
    Series_reference: {
      allowNull: false,
      type: DataTypes.STRING(15)
    },
    Period: {
      allowNull: false,
      type: DataTypes.DATE
    },
    Data_value: {
      type: DataTypes.DOUBLE
    },
    status: DataTypes.STRING,
    units: DataTypes.STRING,
    Magnitude: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    Group: DataTypes.STRING,
    Series_title_1: DataTypes.STRING,
    Series_title_2: DataTypes.STRING,
    Series_title_3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employment1',
  });
  return Employment1;
};