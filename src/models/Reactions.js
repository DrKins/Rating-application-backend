const Sequelize = require('sequelize');
const sequelize = require('../db/db');

module.exports = sequelize.define('reactions', {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    emoticon: {
        type: Sequelize.INTEGER(11)
    },
    company: {
        type: Sequelize.STRING(300)
    }
})
