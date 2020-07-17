const Sequelize = require('sequelize');
const sequelize = require('../db/db');

module.exports = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:  {
    type: Sequelize.STRING(256)
    },
    password:  {
        type: Sequelize.STRING(256)
        },
    lvl: {
        type: Sequelize.INTEGER(15),
    },
    company: {
        type: Sequelize.STRING(255),
    },
})