'use strict';
module.exports = (sequelize, DataTypes) => {
  const GlobalMessage = sequelize.define('GlobalMessage', {
    from: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  GlobalMessage.associate = function(models) {
    GlobalMessage.belongsTo(models.User,{
      as:'fromUser',
      foreignKey:'from'
    })
  };
  return GlobalMessage;
};