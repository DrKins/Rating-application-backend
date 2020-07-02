//      Loading dependencies 

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../config');
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
        res.sendStatus(201);
    }catch{
      res.sendStatus(400);
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
            jwt.sign({user},fs.readFileSync(config.location_key),(err,token)=>{
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
            res.sendStatus(500);
        }
    })
    .catch(err => {
        console.log(err);
            })

});
///////////////////////////Test routes////////////////////////////////////////////
router.get('/test',VerifyToken.ver,(req,res) => {
    jwt.verify(req.token,fs.readFileSync(config.location_key),(err,AuthData)=> {
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


module.exports = router;