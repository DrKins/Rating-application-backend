//      Loading dependencies 

const express = require('express');
const timestamp = require('time-stamp');
const jwt =require('jsonwebtoken');
const fs = require('fs');
const config = require('../../config');
//      Loading reaction models

const Reaction = require('../models/Reaction.js');
//      Loading Querries

const Queries = require('../querries/Queries');
const router = express.Router();
//      Loading methods

const verification = require('../methods/VerifyToken');


let queries = new Queries();
let settings = new Queries()
//      Getting all reactions as a response
router.get('/getreactions',verification.ver,(req,res)=>{  
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
        if(AuthData.user[0].lvl>1){
            queries.GetReactions(AuthData.user[0].company)
            .then(result => {
                res.status(200);
                res.end(result);
            
            })
            .catch(err => {
                console.log(err);
              });
            }else res.sendStatus(403);
        }
    })
});
//      Getting reaction by ID as a response
router.get('/getreaction/:id',verification.ver,(req,res)=>{
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            if(AuthData.user[0].lvl>1){
            queries.GetReactionbyID(req.params.id,AuthData.user[0].company)
            .then(result => {
                res.status(200);
                res.end(result);
            })
            .catch(err=> {
                console.log(err);
            });
            }else
            res.sendStatus(403);
        }
    })
});
//      Inserting a reaction
router.post('/insertreaction',verification.ver,(req,res) => {
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            console.log(AuthData);
            const reaction = new Reaction(timestamp('YYYYMMDD'),req.body.id,AuthData.user[0].company);
            queries.InsertReaction(reaction);
            console.log("Reaction sent");
            res.status(200).send(); 
        }
    })
});
/**/

//      Deleting a reaction
router.get('/deletereaction/:id',verification.ver,(req,res) => {
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            if(AuthData.user[0].lvl>1){
            queries.DeleteReaction(req.params.id,AuthData.user[0].company);
            console.log("Reaction deleted");
            res.status(200).send();
        }else 
        res.sendStatus(403);
        }
    })
}); 
//      Count reactions returns an array
router.get('/countreaction',verification.ver,(req,res) =>{
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            if(AuthData.user[0].lvl>1){
            settings.GetSettings(AuthData.user[0].company)
            .then(result => {
                const emoticonCount = JSON.parse(result)[0].emoticonCount;
                console.log(AuthData.user[0]);
                queries.CountReactions(emoticonCount,AuthData.user[0].company)
                .then(count => {
                    res.status(200);
                    res.end(JSON.stringify(count));
                })
                .catch(err => {
                    console.log(err);
                  });
            })
            .catch(err => {
                console.log(err);
              });
            }else 
            res.sendStatus(403);
        }
    })
});

//      Counts all reactions an integer
router.get('/countreactions/:date',verification.ver,(req,res) =>{
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            if(AuthData.user[0].lvl>1){
            queries.CountReactionsbyDate(req.params.date,AuthData.user[0].company)
            .then(result => {
                res.status(200);
                res.end(JSON.stringify(result));
            })
            .catch(err => {
                console.log(err);
            });
        }else 
        res.sendStatus(403);
        }
    })
});

module.exports = router;