//      Loading dependencies

const express = require('express');
const timestamp = require('time-stamp');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../config');
//      Loading models

const Reaction = require('../models/Reactions');
const Settings = require('../models/Settings');
//      Loading Querries

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
                    console.log("ALL Reaction Got");
                    res.status(200).end(JSON.stringify(reactions));
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(403);
            


        }
    })
});
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
router.delete('/deletereaction/:id', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) { //
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
                //
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
            Reaction.create({emoticon: req.body.emoticon, company: AuthData.company});
            console.log("Reaction sent");
            res.status(200).end();
        }
    })
});

//      Count reactions returns an array
router.get('/countreaction', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Settings.findOne({
                where: {
                    company: AuthData.company
                }
            }).then(setting => {
                var temp = [];
                for (let i = 1; i <= setting.dataValues.emoticonCount; i++) {
                    if (AuthData.lvl > 1) {
                        Reaction.count({
                            where: {
                                emoticon: i,
                                company: AuthData.company
                            }
                        }).then(result => {

                            temp.push(result);
                            if (temp.length == setting.dataValues.emoticonCount) {
                                res.end(JSON.stringify(temp));
                            }

                        }).catch(err => {
                            console.log(err);
                        });


                    } else 
                        res.sendStatus(403);
                    


                }
            })

        }
    })
});

//      Counts all reactions an integer
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
                    var temp = [];
                    for (let i = 0; i <= setting.dataValues.emoticonCount; i++) {
                        Reaction.count({
                            where: {
                                emoticon: i,
                                date: req.params.date,
                                company: AuthData.company
                            }
                        }).then(result => {
                            temp.push(result);
                            if (temp.length == setting.dataValues.emoticonCount) {
                                res.end(JSON.stringify(temp));
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                })

            } else 
                res.sendStatus(403);
            


        }
    })
});

module.exports = router;
