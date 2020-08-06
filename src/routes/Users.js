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
            if (AuthData.lvl > 1) {
                Settings.findOne({
                    where: {
                        company: req.body.company
                    }
                }).then(company => {
                    if (!company) {
                        Settings.create({
                            message: "Hvala vam na glasanju",
                            messageDuration: 5,
                            emoticonCount: 3,
                            company: req.body.company,
                            emoticonPack: "yellowPack"
                        });
                        console.log("Company Created");
                    }
                    User.findOne({
                        where: {
                            name: req.body.name
                        }
                    }).then(async (user) => {
                        let level = req.body.lvl;
                        if (!user) {
                            if(AuthData.lvl==2){
                                level = 1;
                            }
                            const HashedPW = await bcrypt.hash(req.body.password, 10);
                            User.create({name: req.body.name, password: HashedPW, lvl: level, company: req.body.company});
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
// Route used to list all users if admin 3 all user in general if lvl 2 users from his company
router.get('/getallusers', verification.ver, (req, res) => {
    jwt.verify(req.token, config.privkey, (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
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
                    res.sendStatus(500);
                })
            } else {
                res.sendStatus(403);
            }
        }
    })
});

module.exports = router;
