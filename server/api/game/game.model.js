'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
};
