'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

    
    });
    await queryInterface.addColumn('products', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'updatedAt');
    await queryInterface.removeColumn('products', 'createdAT');

  
  }
};
