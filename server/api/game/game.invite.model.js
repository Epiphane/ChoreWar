'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game_invite', {
    _id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  });
};
