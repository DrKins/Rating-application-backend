//      Loading dependencies
const express = require('express');
const jwt =require('jsonwebtoken');
const fs = require('fs');
//      Loading methods
const verification = require('../methods/VerifyToken');
const config = require('../../config');
//      Loading Querries
const Queries = require('../querries/Queries');
let queries = new Queries();

const router = express.Router();

router.get('/getsettings',verification.ver,(req,res) => {
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){

            res.sendStatus(403);
        }else{
            queries.GetSettings(AuthData.user[0].company)
            .then(result => {
                res.status(200);
                res.end(result);
            })
            .catch(err => {
                console.log(err);
              });
        }
    })
});

router.post('/setsettings',verification.ver,(req,res) => {
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            if(AuthData.user[0].lvl>1){
            queries.UpdateSetting(req.body,company,AuthData.user[0].company)
            console.log("Settings updated");
            res.status(200).send();
        }else 
        res.sendStatus(403);
        }
    })
});

module.exports = router;
