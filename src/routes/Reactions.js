//      Loading dependencies 

const express = require('express');
const timestamp = require('time-stamp');
const jwt =require('jsonwebtoken');
const fs = require('fs');

//      Loading reaction models

const Reaction = require('../models/reactions1');
//      Loading Querries

const router = express.Router();
//      Loading methods

const verification = require('../methods/VerifyToken');


router.get('/getreactions1',(req,res)=>{  
Reaction.findAll()
.then(reactions => 
    {
        res.status(200).end(JSON.stringify(reactions));
    })
.catch(err=>console.log(err))
});

router.get('/getreactions1/:id',(req,res)=>{
            Reaction.findOne({
                where:{
                id: req.params.id
                }
            })
            .then(reaction => {
                res.status(200);
                res.send(JSON.stringify(reaction));
            })
            .catch(err=> {
                console.log(err);
            });
});

router.post('/insertreaction1',(req,res) => {
    Reaction.create({
        emoticon: req.body.emoticon,
        company: req.body.company
    });
    console.log("Reaction sent");
    res.status(200).send(); 
});
router.get('/deletereaction1/:id',(req,res)=>{
    Reaction.destroy({
        where:{
        id: req.params.id
        }
    })
    .then(reaction => {
        res.status(200);
        res.send(JSON.stringify(reaction));
    })
    .catch(err=> {
        console.log(err);
    });
});
router.get('/countreaction1',(req,res) =>{
  
    Reaction.count()
            .then(result => {
                res.status(200);
                res.end(JSON.stringify(result));
            })
            .catch(err => {
                console.log(err);
            });
});
router.get('/countreactions1/:date',(req,res) =>{

    Reaction.count({
        where:{
        date: req.params.date
        }
    })
            .then(result => {
                res.status(200);
                res.end(JSON.stringify(result));
            })
            .catch(err => {
                console.log(err);
            });
        

});
//______________________________________________
//      Getting all reactions as a response
router.get('/getreactions',verification.ver,(req,res)=>{  
    jwt.verify(req.token,config.privkey,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
        if(AuthData.user[0].lvl>1){
            Reaction.findAll(AuthData.user[0].company)
            .then(reactions => 
                {
                    res.status(200).end(JSON.stringify(reactions));
                })
            .catch(err => {
                console.log(err);
              });
            }else res.sendStatus(403);
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
            Reaction.create({
                emoticon: req.body.emoticon,
                company: req.body.company
            });
            console.log("Reaction sent");
            res.status(200).end(); 
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
                Reaction.count({
                    where:{
                    date: req.params.date
                    }
                })
                        .then(result => {
                            res.status(200);
                            res.end(JSON.stringify(result));
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
                Reaction.count({
                    where:{
                    date: req.params.date
                    }
                })
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