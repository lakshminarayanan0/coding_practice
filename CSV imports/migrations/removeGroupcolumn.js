'use strict';

const { sequelize, Group, Employment } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    queryInterface.removeColumn('Employments','Group');
  },  

  async down(queryInterface, Sequelize) {

    await queryInterface.addColumn('Employments', 'Group', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
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
        await Employment.update({ Group: group.group_name }, { where: { group_id: group.group_id } });
      }

    }


    },
  
};
