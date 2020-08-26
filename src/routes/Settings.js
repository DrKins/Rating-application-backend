//      Loading dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
//      Loading methods
const verification = require('../methods/VerifyToken');
const config = require('../../config');
const Settings = require('../models/Settings');
//      Loading Querries

const router = express.Router();

router.get('/getsettings', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(401);
        } else {
                Settings.findAll({
                    where: {
                        company: AuthData.company
                    }
                }).then(settings => {  
                    console.log("Settings got");
                    res.json(settings);  
                }).catch(err => console.log(err))
        }
    })
});
//      Settings upedating endpoint 
router.post('/setsettings', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            if (AuthData.lvl > 1) {
                Settings.update({
                    message: req.body.message,
                    messageDuration: req.body.messageDuration,
                    emoticonCount: req.body.emoticonCount,
                    emoticonPack: req.body.emoticonPack
                }, { // what's going to be updated
                    where: {
                        company: AuthData.company
                    }
                } // where clause
                ).then(settings => {
                    console.log("Settings set"+ settings);
                    res.sendStatus(200);
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(401);
        }
    })
});

router.post('/setslack', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            if (AuthData.lvl > 1) {
                Settings.update({
                   SlackToken : req.body.SlackToken,
                   SlackBot : req.body.SlackBot,
                   SlackChannel : req.body.SlackChannel
                }, { // what's going to be updated
                    where: {
                        company: AuthData.company
                    }
                } // where clause
                ).then(settings => {
                    console.log("Slack  Set");
                    res.sendStatus(200);
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(401);
            


        }
    })
});


module.exports = router;
