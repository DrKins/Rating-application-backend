//      loading connector

const mysql = require('mysql');
//      creating db connection

const connection = require('../methods/dbConnect');
//      Import querry structure
const sql = require('./sql');
class Queries{
   
    //      Getting reactions
    GetReactions(){
        return new Promise((resolve, reject) =>{
            const db = connection.createConn();
            db.query(sql.selectall,this.table_name, (err, result) => {
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
            db.query(sql.selectbyid,react_id,(err, result) => {
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
            db.query(sql.selectsettings, (err,result) => {
                if(err) throw err;
                if (result === undefined)
                  reject(new Error("Result is undefined."));
                else
                    resolve(JSON.stringify(result));
            });
            db.end((err)=> console.log("Connection closed"))            
        })
    }
    //      Getting number of reactions 
    CountReactions(emoticon_count){
        return new Promise((resolve, reject) => {
            let temp = []; // deklaracija praznog ispisnog niza
            const db = connection.createConn();
            for (let i = 1; i <= emoticon_count; i++) { // petlja koja vrti od 1 do brojEmotikona iz settings tabele u bazi
               
               
                db.query(sql.countreaction,i ,(err, result) => { // query koji broji pojedinacne reakcije iz baze
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
            
                db.query(sql.countreactionbydate,date ,(err, result) => { 
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
            db.query(sql.getuserbyname,[name ],(err, result) => {
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
        db.query(sql.insertreaction,[req_obj.date,req_obj.reaction],(err,result) => {
            if(err) throw err;
        });
        db.end((err) => console.log("Connection closed"));
    }
    //      Updating settings
    UpdateSetting(req_obj){
           const db = connection.createConn();        
            db.query(sql.updatesettings,[req_obj.poruka,req_obj.trajanje,req_obj.brojEmotikona],(err,result) => {
                if (err) throw err;
            });
            db.end((err) => console.log("Connection closed"));       
    }
    //      Create new user
    CreateNewUser(req_obj){
        const db = connection.createConn();
        db.query(sql.createuser,[req_obj.username,req_obj.password] ,(err, result) => {
            if (err) throw err;
        });
        db.end((err) => console.log("Connection closed"));
    }
    //      Delete reaction
    DeleteReaction(id){
        const db= connection.createConn();
        db.query(sql.deletereacion,id,(err,result) => {
            if (err) throw err;
        })
        db.end((err) => console.log("Connection closed"));        
    }
}

module.exports = Queries;
