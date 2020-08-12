const Sequelize = require('sequelize');
const sequelize = require('../db/db');

module.exports = sequelize.define('settings', {
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
        type: Sequelize.INTEGER(11)
    },
    emoticonCount: {
        type: Sequelize.INTEGER(11)
    },
    company: {
        type: Sequelize.STRING(300)
    },
    emoticonPack: {
        type: Sequelize.STRING(300)
    },
    SlackToken:
    {
        type: Sequelize.STRING(255),
        defaultValue: "none"
    },
    SlackBot:
    {
        type: Sequelize.STRING(255),
        defaultValue: "rating"
    },
    SlackChannel:
    {
        type: Sequelize.STRING(255),
        defaultValue: "random"
    }
})
