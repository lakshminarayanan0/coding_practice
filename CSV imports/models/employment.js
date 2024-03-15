'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employment extends Model {

    static associate(models) {

    }
  }
  Employment.init({
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
    Subject: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Group: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Series_title_1: DataTypes.STRING,
    Series_title_2: DataTypes.STRING,
    Series_title_3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employment',
  });
  return Employment;
};