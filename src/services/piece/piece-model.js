'use strict';

// piece-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const piece = sequelize.define('pieces', {
    x: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    y: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    position: {
      type: Sequelize.STRING,
      unique: true
    },
    userId: {
      type: Sequelize.INTEGER
    }
  }, {
    freezeTableName: true
  });

  piece.sync();

  return piece;
};
