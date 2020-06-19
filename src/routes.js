const express = require('express');
const mysql = require('mysql');
const timestamp = require('time-stamp');

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'rating'   
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});
const router = express.Router();

// Create DB  -- DA li je ovo potrebno?
router.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE rating';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table   -- DA li je ovo potrebno?
router.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE glasanje(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(' Table created...');
    });
});

// Insert post 1
router.get('/insertreaction/:id', (req, res) => {
         let sql = 'INSERT INTO reakcije(date,emoticon) VALUES('+ timestamp('YYYYMMDD')+ ',' + req.params.id +')';
         db.query(sql,(err, result) => {
         if(err) throw err;
    console.log(result);
       console.log("REAKCIJE DODANA")
         res.send(result);
   console.log(timestamp())
     });
}
);

// Select posts
router.get('/getreaction', (req, res) => {
    let sql = 'SELECT * FROM reakcije';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});
router.get('/getsettings', (req, res) => {
    let sql = 'SELECT * FROM postavke';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});


// Select single post
router.get('/getreaction/:id', (req, res) => {
    let sql = `SELECT * FROM reakcije WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Update postpm 
router.put('/getsettings/:poruka/:trajanje/:brojEmotikona', (req, res) => {
    let sql = `UPDATE postavke SET poruka = ${JSON.stringify(req.params.poruka)} , trajanjePoruke = ${req.params.trajanje} , brojEmotikona = ${req.params.brojEmotikona} WHERE id = 1 `;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("UPDATE" +'\n' +"Poruka: " +req.params.poruka + '\n'+ " trajanje poruke: " + req.params.trajanje +'\n' + " broj emotikona: " + req.params.brojEmotikona);
    });
});

// Delete post
router.get('/deletereaction/:id', (req, res) => {
    let sql = `DELETE FROM reakcije WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('REAKCIJA OBRISANA');
    });
});

// count posts 
router.get('/countpost/:id', (req, res) => {
    let sql = `SELECT COUNT(emoticon) AS ispis FROM reakcije WHERE   ${req.params.id} `;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results[0].ispis);
        res.send(results[0].ispis);
    });
});




module.exports = router;