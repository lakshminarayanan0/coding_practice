'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('group', {
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

//  const groupData= await sequelize.query('select "Group" , count(*) as count from "Employments" group by "Group"',{type:sequelize.QueryTypes.SELECT});

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

 //await queryInterface.bulkInsert('group',groupData.map(grp=>({group_name:grp.Group})),{}) 
 
 await sequelize.transaction(async (transaction) => {
  await sequelize.models.Group.bulkCreate(
    groupData.map((grp) => ({ group_name: grp.Group })),
    { transaction }
  );
});
}

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('group');
  }
};