'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Series_reference: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Period: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Data_value: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      units: {
        type: Sequelize.STRING
      },
      Magnitude: {
        type: Sequelize.INTEGER
      },
      Subject: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Group: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Series_title_1: {
        type: Sequelize.STRING
      },
      Series_title_2: {
        type: Sequelize.STRING
      },
      Series_title_3: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employments');
  }
};