const Sequelize = require('sequelize');
const sequelize = require('../db/db');

module.exports = sequelize.define('postavke',{
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    poruka: {
    type: Sequelize.STRING(30)
    },
    trajanjePoruke: {
        type: Sequelize.INTEGER(11),
    },
    brojEmotikona: {
        type: Sequelize.INTEGER(11),
    },
    company: {
        type: Sequelize.STRING(300),
    },
})