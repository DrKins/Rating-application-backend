//      loading connector

const mysql = require('mysql');
//      creating db connection

const connection = require('../methods/dbConnect');

class Queries{
    constructor(table_name){
        this.table_name = table_name;
    }
    //      Getting reactions
    GetReactions(){
        return new Promise((resolve, reject) =>{
            const db = connection.createConn();
            const sql = `SELECT * FROM ${this.table_name}`;

            db.query(sql, (err, result) => {
                if (err) throw err;
        
                if (result === undefined)
                  reject(new Error("Result is undefined."));
                else
                  resolve(JSON.stringify(result));
              });
        db.end((err)=> console.log("Connection closed"))
        });
    }
    //      Getting a single reaction by ID
    GetReactionbyID(react_id){
        return new Promise((resolve, reject) =>{
            const db = connection.createConn();
            const sql = `SELECT * FROM ${this.table_name} WHERE id=${react_id}`;

            db.query(sql, (err, result) => {
                if (err) throw err;
        
                if (result === undefined)
                  reject(new Error("Result is undefined."));
                else
                  resolve(JSON.stringify(result));
              });
        db.end((err)=> console.log("Connection closed"))
        });
    }
    //      Getting settings
    GetSettings(){
        return new Promise((resolve,reject) =>{
            const db = connection.createConn();
            const sql = `SELECT * FROM ${this.table_name}`;

            db.query(sql, (err,result) => {
                if(err) throw err;

                if (result === undefined)
                    reject(new Error("Result is undefined."));
                else
                    resolve(JSON.stringify(result));
            });
        })
    }
    //      Getting number of reactions 
    CountReactions(emoticon_count){
        return new Promise((resolve, reject) => {
            let temp = []; // deklaracija praznog ispisnog niza
            const db = connection.createConn();
            for (let i = 1; i <= emoticon_count; i++) { // petlja koja vrti od 1 do brojEmotikona iz settings tabele u bazi
               
                let sql = `SELECT COUNT(emoticon) AS ispis FROM ${this.table_name} WHERE emoticon='${i}'`;
                
                db.query(sql, (err, result) => { // query koji broji pojedinacne reakcije iz baze
                    if (err) 
                        throw err;
                    
                    temp.push(result[0].ispis); // upisivanje prebrojanih vrijednosti u niz za ispis
                    if (temp === undefined) 
                        reject(new Error("Undefined"));
                     else {
                        if (i == emoticon_count) {
                            resolve(temp);
                        }
                    }
                });
            }
            db.end((err) => console.log("Connection closed"));
        });
    }
    //      Getting number of reactions by date
    CountReactionsbyDate(date){
        return new Promise((resolve, reject) => {
            const db = connection.createConn();
            
                let sql = `SELECT COUNT(emoticon) AS ispis FROM reakcije WHERE date =${date}`;
                db.query(sql, (err, result) => { 
                    if (err) throw err;
                    if (result === undefined) 
                        reject(new Error("Undefined"));
                     else
                        resolve(result);
                        db.end((err) => console.log("Connection closed"));
                });
            
        });
    }
    //      Geting user by name
    GetUserbyName(name) {
        return new Promise((resolve, reject) => {
            const db = connection.createConn();
            db.query(`SELECT * FROM users WHERE name='${name}'`, (err, result) => {
                if (err) 
                    throw err;
    
                if (result.length==0) 
                    reject(new Error("Cannot find user"));
                else if(result == undefined)
                    reject(new Error("Response is undefined"));
                else 
                    resolve(JSON.stringify(result));
                db.end((err) => console.log("Connection closed"));
            });
        });
        }
    //      Inserting one reaction
    InsertReaction(req_obj){
        const db = connection.createConn();
        const sql = `INSERT INTO ${this.table_name}(date,emoticon) VALUES('${req_obj.date}','${req_obj.reaction}')`
        console.log(sql);
        db.query(sql,(err,result) => {
            if(err) throw err;
        });
        db.end((err) => console.log("Connection closed"));

    }
    //      Updating settings
    UpdateSetting(req_obj){
           const db = connection.createConn();
           const sql = `UPDATE postavke SET poruka = '${req_obj.poruka}' , trajanjePoruke = ${req_obj.trajanje} , brojEmotikona = ${req_obj.brojEmotikona}`;
        
            db.query(sql,(err,result) => {
                if (err) throw err;
            });
            db.end((err) => console.log("Connection closed"));       
    }
    //      Create new user
    CreateNewUser(req_obj){
        const db = connection.createConn();
        const sql = `INSERT INTO ${this.table_name} (name, password) VALUES ('${req_obj.username}','${req_obj.password}')`;
        db.query(sql, (err, result) => {
            if (err) throw err;
        });
        db.end((err) => console.log("Connection closed"));
    }
    //      Delete reaction
    DeleteReaction(id){
        const db= connection.createConn();
        const sql = `DELETE FROM reakcije WHERE id = ${id}`;

        db.query(sql,(err,result) => {
            if (err) throw err;
        })
        db.end((err) => console.log("Connection closed"));        
    }
}

module.exports = Queries;
