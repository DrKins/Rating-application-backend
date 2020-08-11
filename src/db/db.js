//      Load SEQUELIZE

const config = require('../../config.js');
const Sequelize = require('sequelize');
//      Load connection obj
 
const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: config.db_host,
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

module.exports = sequelize;
