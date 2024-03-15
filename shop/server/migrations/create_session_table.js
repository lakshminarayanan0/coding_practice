'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
{ tableName: 'sessions', schema: 'tenants' },
      {
        sid: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        expires: {
          type: Sequelize.DATE,
        },
        data: {
          type: Sequelize.TEXT,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
    );

    // Assuming you have an existing 'users' table
    await queryInterface.addConstraint({ tableName: 'sessions', schema: 'tenants' }, {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_userId_sessions',
      references: {
        table: 'tenants.users', 
        schema:"tenants",
        field: 'userId',    
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the foreign key constraint first
    await queryInterface.removeConstraint({ tableName: 'sessions', schema: 'tenants' }, 'fk_userId_sessions');
    
    // Drop the 'sessions' table
    await queryInterface.dropTable({ tableName: 'sessions', schema: 'tenants' });
  }
};
