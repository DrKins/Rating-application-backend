//      loading connector

const mysql = require('mysql');
//      loading db configuration

const dbConfig = require('../models/DBconfig');

const connection ={
    createConn(){
    //      Create connection
        var db = mysql.createConnection(new dbConfig());

    //      Connect do db
    db.connect((err)=> {
        if(err) throw err;
        console.log("MySQL connected.");
    });
    return db;
    }
}
module.exports = connection;
