const { User,sequelize } = require("./models");


async function signUpUser(username, password, email, phone) {
    let transaction;
    
    try {
      transaction = await sequelize.transaction();
  
      const user = await User.create({
        username,
        email,
        phone,
        password,
      }, 
      { transaction });
  
      await transaction.commit();
  
      return user;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }

function signInUser(username,password){
  return User.findOne({where:{username:username,password:password}})
}
module.exports={
    signUpUser,
    signInUser
}
