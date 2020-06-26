//      Loading dependencies 

const express = require('express');
const timestamp = require('time-stamp');
const jwt =require('jsonwebtoken');
//      Loading reaction models

const Reaction = require('../models/Reaction.js');
//      Loading Querries

const Queries = require('../querries/Queries');
const router = express.Router();
//      Loading methods
const VerifyToken = require('../methods/VerifyToken');
const verification = require('../methods/VerifyToken');


let queries = new Queries();
let settings = new Queries()
//      Getting all reactions as a response
router.get('/getreactions',VerifyToken.ver,(req,res)=>{  
    jwt.verify(req.token,process.env.PRIVATE_KEY,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            queries.GetReactions()
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
//      Getting reaction by ID as a response
router.get('/getreaction/:id',verification.ver,(req,res)=>{
    jwt.verify(req.token,process.env.PRIVATE_KEY,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            queries.GetReactionbyID(req.params.id)
            .then(result => {
                res.status(200);
                res.end(result);
            })
            .catch(err=> {
                console.log(err);
            });
        }
    })
});
//      Inserting a reaction
router.post('/insertreaction',verification.ver,(req,res) => {
    const reaction = new Reaction(timestamp('YYYYMMDD'),req.body.id)
    queries.InsertReaction(reaction);
    console.log("Reaction sent");
    res.status(200).send();
});

//      Deleting a reaction
router.get('/deletereaction/:id',verification.ver,(req,res) => {
    jwt.verify(req.token,process.env.PRIVATE_KEY,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            queries.DeleteReaction(req.params.id);
            console.log("Reaction deleted");
            res.status(200).send();
        }
    })
}); 
//      Count reactions returns an array
router.get('/countreaction',(req,res) =>{
    jwt.verify(req.token,process.env.PRIVATE_KEY,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            settings.GetSettings()
            .then(result => {
                const broj_emotikona = JSON.parse(result)[0].brojEmotikona;
                console.log(broj_emotikona);
                queries.CountReactions(broj_emotikona)
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
        }
    })
});

//      Counts all reactions an integer
router.get('/countreactions/:date',(req,res) =>{
    jwt.verify(req.token,process.env.PRIVATE_KEY,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            queries.CountReactionsbyDate(req.params.date)
            .then(result => {
                res.status(200);
                res.end(JSON.stringify(result));
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
});

module.exports = router;