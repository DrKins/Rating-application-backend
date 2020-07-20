const Sequelize = require('sequelize');
const sequelize = require('../db/db');

module.exports = sequelize.define('settings',{
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
    type: Sequelize.STRING(30)
    },
    messageDuration: {
        type: Sequelize.INTEGER(11),
    },
    emoticonCount: {
        type: Sequelize.INTEGER(11),
    },
    company: {
        type: Sequelize.STRING(300),
    },
})