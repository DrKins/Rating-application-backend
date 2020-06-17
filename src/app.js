const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors');
const timestamp = require('time-stamp');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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



// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE rating';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE glasanje(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(' Table created...');
    });
});

// Insert post 1
app.get('/insertreaction/:id', (req, res) => {
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
app.get('/vrijeme',(req,res)=>
{
    //res.send(timestamp('DD.MM.YYYY - HH:mm:ss'));
    res.send(timestamp());
}
);
// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

// Select posts
app.get('/getreaction', (req, res) => {
    let sql = 'SELECT * FROM reakcije';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});
app.get('/getsettings', (req, res) => {
    let sql = 'SELECT * FROM postavke';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
});


// Select single post
app.get('/getreaction/:id', (req, res) => {
    let sql = `SELECT * FROM reakcije WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});
//test/
app.get('/test/:poruka', (req,res)=>
{
 res.send(req.params.poruka);
}
);
// Update postpm 

app.put('/getsettings/:poruka/:trajanjePoruke/:brojEmotikona', (req, res) => {
    let sql = `UPDATE postavke SET poruka = ${req.params.poruka} , trajanjePoruke = ${req.params.trajanjePoruke} , brojEmotikona = ${req.params.brojEmotikona} `;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

// Delete post


app.get('/deletereaction/:id', (req, res) => {
    let sql = `DELETE FROM reakcije WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('REAKCIJA OBRISANA');
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server startan na portu ${port}`);
});