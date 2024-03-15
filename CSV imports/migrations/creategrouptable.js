'use strict';

const { sequelize, Employment } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('group1', {
      group_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_name: {
        type: Sequelize.STRING
      }
    });

    const chunkSize=1000
    const totalRecords=await Employment.count()
    const totalChunk=Math.ceil(totalRecords/chunkSize)
    for(let chunk=0;chunk<totalChunk;chunk++){
      const groupData = await Employment.findAll({
        attributes: ['Group', [Sequelize.fn('count', Sequelize.col('*')), 'count']],
        group: ['Group'],
        raw: true,
        limit:chunkSize,
        offset:chunk * chunkSize
      });

      // using transaction and model for bulk inserting
      await sequelize.transaction(async (transaction) => {
        await sequelize.models.Group1.bulkCreate(
          groupData.map((grp) => ({ group_name: grp.Group })),
          { transaction }
        );
      });

      //try to insert using queryinterface operation done but syntax error at sql query created using sequelize

      // const bulkInsertData = groupData.map(grp => ({ group_name: grp.Group }));
      // await queryInterface.bulkInsert('group1', bulkInsertData, {});
    
    }
    // const groupData= await sequelize.query('select "Group" , count(*) as count from "Employments" group by "Group"',{type:sequelize.QueryTypes.SELECT});

//  const groupData = await queryInterface.select('Employments', {
//     attributes: [
//       'Group',
//       [sequelize.fn('count', sequelize.col('*')), 'count']
//     ],
//     group: ['Group'],
//     type: sequelize.QueryTypes.SELECT
//   });
  
 

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('group1');
  }
};