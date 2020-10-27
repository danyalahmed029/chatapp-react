'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Chat.associate = function(models) {
    Chat.belongsTo(models.User,{
      as:'fromUser',
      foreignKey:'from'
    }),
    Chat.belongsTo(models.User,{
      as:'toUser',
      foreignKey:'to'
    })
  };
  return Chat;
};