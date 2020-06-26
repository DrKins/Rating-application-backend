//      Loading dependencies 

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const https = require('https');
require ('dotenv').config();
//      Loading reaction models

const User = require('../models/User');
//      Loading methods 
const VerifyToken = require('../methods/VerifyToken');

//      Loading Querries

const Queries = require('../querries/Queries');

const router = express.Router()
let queries = new Queries();

router.post('/register',async (req,res) =>{
    try{
        const HashedPW =await bcrypt.hash(req.body.password,10);
        const user =  new User(req.body.username,HashedPW);
        queries.CreateNewUser(user);
        console.log("User created");
        res.status(201).send();
    }catch{
        res.status(400).send();
    }

});

router.post('/login',(req,res) =>{
    queries.GetUserbyName(req.body.username)
    .then(async response => { 
        
        const user = JSON.parse(response);
        try{
        await bcrypt.compare(req.body.password, user[0].password,(err,succes)=>{
        if (err) { return error(err) }           
        if(succes==true){
            jwt.sign({user},process.env.PRIVATE_KEY,(err,token)=>{
                res.json({
                    token
                })
                res.send();
            }); 
        }
       });
    }
        catch{
            console.log(err);
            res.status(500).send()
        }
    })
    .catch(err => {
        console.log(err);
            })

});
///////////////////////////Test routes////////////////////////////////////////////
router.get('/test',VerifyToken.ver,(req,res) => {
    jwt.verify(req.token,process.env.PRIVATE_KEY,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            console.log("Uspio");
            res.json({
                message: 'UUU',
                AuthData
            });
        }
    })

})
// const options = {
//     hostname : 'localhost/',
//     port : process.env.PORT,
//     path:'/api/users/test3',
//     method: 'post'
// };

/*
const req = https.request('/test2', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
*/

module.exports = router;