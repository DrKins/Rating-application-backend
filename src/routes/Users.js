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
//      Initializing router

const router = express.Router()
//      Creating a new user 
router.post('/register', verification.ver, async (req, res) => {

    jwt.verify(req.token, config.privkey, async (err, AuthData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            if (AuthData.lvl > 1) {
                Settings.findOne({
                    where: {
                        company: req.body.company
                    }
                }).then(company => {
                    if (!company) {             //Cheking if a company exists and creates it if it doesn't 
                        Settings.create({
                            message: "Hvala vam na glasanju",   
                            messageDuration: 5,
                            emoticonCount: 3,
                            company: req.body.company,          //      Default settings values for new company
                            emoticonPack: "yellowPack"
                        });
                        console.log("Company Created");
                    }
                    User.findOne({
                        where: {
                            name: req.body.name  //     Querrying to chek if username already in use
                        }
                    }).then(async (user) => {
                        let level = req.body.lvl;
                        if (!user) {        
                            if(AuthData.lvl==2){
                                level = 1;      //      Lvl 2 user is only allowed to crate lvl 1 user
                            }
                            const HashedPW = await bcrypt.hash(req.body.password, 10);
                            User.create({name: req.body.name, password: HashedPW, lvl: level, company: req.body.company});
                            console.log("User created");
                        } else {
                            console.log("User exist");
                        }
                    }).catch(err => console.log(err))
                    res.status(406).end();

                }).catch(err => console.log(err))
            } else 
                res.sendStatus(401);
        }
    })
});
// Route used for user login 
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                name: req.body.username
            }
        }).then(async response => {
            try {
                    await bcrypt.compare(req.body.password, response.dataValues.password, (err, succes) => {
                        if (err) {
                            res.sendStatus(401);
                        }
                        if (succes == true) {
                            let lvl = response.dataValues.lvl;
                            let usr = response.dataValues.name;
                            let company = response.dataValues.company;
                            jwt.sign(response.dataValues, config.privkey, (err, token) => {
                                res.json({token, "level": lvl,"name":usr,"company":company});
                                res.end();
                            });
                        }
                    });
                } catch {
                    console.log(err);

                    res.sendStatus(406);
                }}
        ).catch(err => {
            console.log(err);
        })}
);
// Route used to list all users if admin 3 all user in general if lvl 2 users from his company
router.get('/getallusers', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(401);
        } else {
            if (AuthData.lvl == 3) {
                User.findAll({raw: true}).then(users => {
                    users.forEach(user => {
                        delete user.password
                    })
                    console.log("ALL USERS Got");
                    res.status(200).end(JSON.stringify(users));
                }).catch(err => console.log(err))
            } else if (AuthData.lvl == 2) {
                User.findAll({
                    where: {
                        company: AuthData.company
                    }
                }).then(users => {
                    users.forEach(user => {
                        delete user.password
                    })
                    res.status(200).end(JSON.stringify(users));
                    console.log("All users sent");
                }).catch(err => {
                    console.log(err);
                    res.sendStatus(406);
                })
            } else {
                res.sendStatus(401);
            }
        }
    })
});

module.exports = router;
