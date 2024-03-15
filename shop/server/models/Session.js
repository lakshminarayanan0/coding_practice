const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Session extends Model {}

  Session.init(
    {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      expires: {
        type: DataTypes.DATE,
      },
      data: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.UUID, 
        references: {
          model: 'User',
          tableName:"users",
          schema:"tenants",
          key: 'userId',
        },
      },
    },
    {
      sequelize,
      modelName: 'Session',
      tableName: 'sessions',
      schema:"tenants"
    }
  );

  Session.associate = (models) => {
    Session.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
  };

  return Session;
};
