/**
 * Load SEQUELIZE
 */
const Sequelize = require('sequelize');

/**
 * Load connection obj
 */
const sequelize = new Sequelize(
  'xuZXyWb00y',
  // 'test', // Use when testing failed connection
  'xuZXyWb00y',
  'DQkiFTxMgL',
  {
    host: 'remotemysql.com',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

module.exports = sequelize;