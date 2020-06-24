//      Loading dependencies 

const express = require('express');
const bcrypt = require('bcrypt');
//      Loading reaction models

const User = require('../models/User');
//      Loading Querries

const Queries = require('../querries/Queries');
const router = express.Router();

let queries = new Queries('users');

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
             res.send(succes);
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
module.exports = router;