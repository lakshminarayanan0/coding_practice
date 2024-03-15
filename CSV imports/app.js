
const { Group, Employment } = require('./models');

Group.bulkcreate({

  include:[{
    model:Employment,
    as
  }]
})