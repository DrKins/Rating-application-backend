//      Loading dependencies 

const express = require('express');
const timestamp = require('time-stamp');
//      Loading reaction models

const Reaction = require('../models/Reaction.js');
//      Loading Querries

const Queries = require('../querries/Queries');
const router = express.Router();


let queries = new Queries('reakcije');
let settings = new Queries('postavke')
//      Getting all reactions as a response
router.get('/getreactions',(req,res)=>{  
    queries.GetReactions()
    .then(result => {
        res.status(200);
        res.end(result);
    })
    .catch(err => {
        console.log(err);
      }); 
});
//      Getting reaction by ID as a response
router.get('/getreaction/:id',(req,res)=>{
    queries.GetReactionbyID(req.params.id)
    .then(result => {
        res.status(200);
        res.end(result);
    })
    .catch(err=> {
        console.log(err);
    });
});
//      Inserting a reaction
router.post('/insertreaction',(req,res) => {
    const reaction = new Reaction(timestamp('YYYYMMDD'),req.body.id)
    queries.InsertReaction(reaction);
    console.log("Reaction sent");
    res.status(200).send();
});
//      Deleting a reaction
router.get('/deletereaction/:id',(req,res) => {
    queries.DeleteReaction(req.params.id);
    console.log("Reaction deleted");
    res.status(200).send();
}); 
//      Count reactions returns an array
router.get('/countreaction',(req,res) =>{
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
});
//      Counts all reactions an integer
router.get('/countreactions/:date',(req,res) =>{
    queries.CountReactionsbyDate(req.params.date)
    .then(result => {
        res.status(200);
        res.end(JSON.stringify(result));
    })
    .catch(err => {
        console.log(err);
    });
});

module.exports = router;
