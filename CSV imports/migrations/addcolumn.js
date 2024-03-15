'use strict';

const { sequelize, Employment, Group } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Employments", "group_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue:1
    });

    await queryInterface.addColumn("Employments", "state", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:"Tamil nadu"
    });

    await queryInterface.addColumn("Employments", "country", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue:"India"
    });


    await Employment.update({ state:"Kerala"},{where:{ id :{ [Sequelize.Op.not]: 0, [Sequelize.Op.mod]: [2, 0] }}})


    await queryInterface.addConstraint("Employments", {
      fields: ["group_id"],
      type: "foreign key",
      references: {
        table: "group",
        field: "group_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });


const chunkSize=4
const totalRecords=await Group.count()
const totalChunk=Math.ceil(totalRecords/chunkSize)
for(let chunk=0;chunk<totalChunk;chunk++){
  const groupData = await Group.findAll({
    limit:chunkSize,
    offset:chunk * chunkSize
  });


    for (const group of groupData) {
      await queryInterface.bulkUpdate(
        'Employments',
        { group_id: group.group_id },
        { Group: group.group_name }
      );
    }
    
  }
    
    
  },
   
  
   

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Employments", "Employments_group_id_group_fk");

    await queryInterface.removeColumn("Employments", "group_id");

    await queryInterface.removeColumn("Employments","state");

    await queryInterface.removeColumn("Employments","country");

 
  }
};
