//      Loading dependencies

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../config');
//      Loading models
const User = require('../models/User');
const Settings = require('../models/Settings');
//      Loading methods

const verification = require('../methods/VerifyToken');

const router = express.Router()

router.post('/register', verification.ver, async (req, res) => {

    jwt.verify(req.token, config.privkey, async (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (AuthData.lvl > 2) {
                Settings.findOne({
                    where: {
                        company: req.body.company
                    }
                }).then(company => {
                    if (!company) {
                        Settings.create({message: "Hvala vam na glasanju", messageDuration: 5, emoticonCount: 3, company: req.body.company});
                        console.log("Company Created");
                         }
                        User.findOne({
                            where:{
                                name: req.body.name
                            }
                        }).then(async (user) => {
                            if (!user) {
                                const HashedPW = await bcrypt.hash(req.body.password, 10);
                                User.create({name: req.body.name, password: HashedPW, lvl: req.body.lvl, company: req.body.company});
                                console.log("User created");
                            } else {
                                console.log("User exist");
                            }
                        }).catch(err => console.log(err))
                        res.status(400).end();
                    
                }).catch(err => console.log(err))
            } else 
                res.sendStatus(403);
            
        }
    })
});


router.post('/login', (req, res) => {
    User.findOne({
            where: {
                name: req.body.username
            }
        }).then(async response => {

            try {
                    await bcrypt.compare(req.body.password, response.dataValues.password, (err, succes) => {
                        if (err) {
                            res.sendStatus(403);
                        }
                        if (succes == true) {
                            let lvl = response.dataValues.lvl;
                            jwt.sign(response.dataValues, config.privkey, (err, token) => {
                                res.json({token, "level": lvl})
                                res.end();
                            });
                        }
                    });
                } catch {
                    console.log(err);

                    res.sendStatus(500);
                }}
        ).catch(err => {
            console.log(err);
        })}
);


module.exports = router;

