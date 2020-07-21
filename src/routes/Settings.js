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

            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) {
                Settings.findAll({
                    where: {
                        company: AuthData.company
                    }
                }).then(settings => {
                    console.log("Got settings");
                    res.status(200).end(JSON.stringify(settings));
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(403);
            
        }
    })
});

router.patch('/setsettings', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 1) {
                Settings.update({
                    message: req.body.message,
                    messageDuration: req.body.messageDuration,
                    emoticonCount: req.body.emoticonCount
                }, { // what's going to be updated
                    where: {
                        company: AuthData.company
                    }
                } // where clause
                ).then(settings => {
                    console.log("Settings set");
                    res.sendStatus(200);
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(403);
            
        }
    })
});

module.exports = router;
