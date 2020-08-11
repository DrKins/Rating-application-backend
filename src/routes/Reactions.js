//      Loading dependencies

const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../config');
const timestamp = require('time-stamp');
const sequelize= require('sequelize');
//      Loading models

const Reaction = require('../models/Reactions');
const Settings = require('../models/Settings');


const router = express.Router();
//      Loading methods

const verification = require('../methods/VerifyToken');

//      Getting all reactions as a response

router.get('/getreactions', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) {
                Reaction.findAll({
                    where: {
                        company: AuthData.company
                    }
                }).then(reactions => {
                    console.log("Reactions Displayed");
                    res.status(200).end(JSON.stringify(reactions));
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(403);  
        }
    })
});
//      Getting a reaction by id
router.get('/getreaction/:id', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) {
                Reaction.findOne({
                    where: {
                        id: req.params.id
                    }
                }).then(reactions => {
                    if (reactions != null) {
                        if (reactions.company == AuthData.company) {
                            console.log("Reaction GOT /ID");
                            res.status(200).end(JSON.stringify(reactions));
                        } else {
                            console.log("ID not found");
                            res.sendStatus(404);
                        }
                    } else {
                        console.log("NULL")
                        res.sendStatus(404);
                    }
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(403);
        }
    })
});
//      Deleting a reaction
router.delete('/deletereaction/:id', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) {
                Reaction.findOne({
                    where: {
                        id: req.params.id
                    }
                }).then(reactions => {
                    if (reactions != null) {
                        if (reactions.company == AuthData.company) {
                            Reaction.destroy({
                                where: {
                                    id: req.params.id
                                }
                            }).then(reaction => {
                                res.status(200);
                                res.send(JSON.stringify(reaction));
                                console.log("Reaction deleted");
                            }).catch(err => {
                                console.log(err);
                            });
                        } else {
                            console.log("ID NOT FOUND IN YOUR COMPANY");
                            res.sendStatus(404);
                        }
                    } else {
                        console.log("NULL")
                        res.sendStatus(404);
                    }
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(403);
        }
    })
});
//      Inserting a reaction
router.post('/insertreaction', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Reaction.create({emoticon: req.body.emoticon, company: AuthData.company,date : timestamp('YYYYMMDDHHmmss')});
            console.log("Reaction sent");
            try {
                res.header("Content-Type", "text/plain") // removes a warning in firefox
                console.log(timestamp.utc('YYYYMMDDHHmmss'));
                req.io.emit("INSERTION", "aa"); // socket servise emit needed for real time graph updates
                res.status(200).end("Reaction Inserted");
            } catch (error) {
                res.header("Content-Type", "text/plain") // removes a warning in firefox
                console.log(error);
                res.status(406).end();
            }
        }
        
    })
});
//      Count reactions by hour for specified date
router.get('/bydate/:date', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) {
                Settings.findOne({
                    where: {
                        company: AuthData.company
                    }
                }).then(setting => {
                    var temp_date = req.params.date.substring(1); // removes the : from the date
                    var emoticonc = setting.emoticonCount;
                        Reaction.findAll({
                            where: {
                                where: sequelize.where(sequelize.fn('date', sequelize.col('date')), temp_date),
                                company: AuthData.company
                            },
                            raw:true    
                        }).then((result) => {
                            let temp ={};
                            for(let i=1;i<=setting.emoticonCount;i++){
                                let react = new Array(24).fill(0);                             
                                for(let j=0;j<=23;j++){
                                    result.forEach(el=> {
                                        if(el.emoticon==i && parseInt(timestamp("HH",el.date))==j){
                                            react[j]++;
                                        }
                                    })
                                    if(j==23){
                                temp[i]=react;
                                    }
                                }   
                            }
                            console.log("Hourly report sent!");
                           res.json({temp,emoticonc});
                        }).catch(err => {
                            console.log(err);
                        });
                })
            } else 
                res.sendStatus(403);
        }
    })
});
//      Counts reactions by date and returns an array
router.get('/countreactions/:date', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) {
                Settings.findOne({
                    where: {
                        company: AuthData.company
                    }
                }).then(setting => {

                    var temp_date = req.params.date.substring(1); // removes the : from the date
                    var emoticonc = setting.emoticonCount;
                 
                        Reaction.count({
                            where: {
                                where: sequelize.where(sequelize.fn('date', sequelize.col('date')), temp_date),
                                company: AuthData.company
                            },
                             group:['emoticon']// yyyymmdd hhmmss 
                        }).then((result) => {
                            let temp = [];
                            for (let i = 1; i <= emoticonc; i++) {  // folowing code written by carcair
                                temp[i-1] = 0;
                                result.forEach((obj, ind) => {   //Counts reactions for each hour
                                    if(result[ind].emoticon == i)
                                        temp[i-1] = result[ind].count;
                                })
                            }
                            console.log("Report sent!");
                           res.json({temp,emoticonc}); //responds with hourly report and emoticon count
                        }).catch(err => {
                            console.log(err);
                        });    
                })

            } else 
                res.sendStatus(403);
        }
    })
});

module.exports = router;
