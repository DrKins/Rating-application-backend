/**
 * Load SEQUELIZE
 */
const Sequelize = require('sequelize');

/**
 * Load connection obj
 */
const sequelize = new Sequelize(
  'rating',
  // 'test', // Use when testing failed connection
  'root',
  'password',
  {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

module.exports = sequelize;