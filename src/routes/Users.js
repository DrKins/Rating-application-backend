//      Loading dependencies

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../../config');
//      Loading reaction models

const User = require('../models/User');
const Useri = require('../models/users1');
//      Loading methods
const VerifyToken = require('../methods/VerifyToken');

//      Loading Querries

const Queries = require('../querries/Queries');
const verification = require('../methods/VerifyToken');

const router = express.Router()
let queries = new Queries();

router.post('/register', verification.ver, async (req, res) => {

    jwt.verify(req.token, config.privkey, async (err, AuthData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            queries.GetSettings(req.body.company).then((result)=>{
                if(result==="[]"){
                queries.CreateSettings(req.body.company);
                }
            })
            queries.GetUserbyName(req.body.username).then(async (result) => {
                if (result != "[]") {
                    res.sendStatus(400);
                } else {

                    if (AuthData.user[0].lvl == 1) {
                        // this if and its elses are used for the leveling system could
                        // possibly be substituted with a switch case
                        res.sendStatus(403);
                    } else if (AuthData.user[0].lvl == 2) {
                        const HashedPW = await bcrypt.hash(req.body.password, 10);
                        if (req.body.level > 2) {
                            res.sendStatus(403)
                        }
                        const user = new User(req.body.username, HashedPW, req.body.level, AuthData.user[0].company);
                        console.log(user);

                        queries.CreateNewUser(user);
                        console.log("User created");
                        res.sendStatus(201);
                    } else if (AuthData.user[0].lvl == 3) {
                        const HashedPW = await bcrypt.hash(req.body.password, 10);
                        const user = new User(req.body.username, HashedPW, req.body.level, req.body.company);
                        console.log(user);

                        queries.CreateNewUser(user);
                        console.log("User created");
                        res.sendStatus(201);
                    } else {

                        res.sendStatus(403);
                    }
                }
            }).catch(err => {
                res.send(err);
            })
        }
    })
});


router.post('/login', (req, res) => {
    Useri.findOne({
        where:{
       name: req.body.username
        }
    }).then(async response => {
                try {
                    await bcrypt.compare(req.body.password, user[0].password, (err, succes) => {
                        if (err) {
                            res.sendStatus(403)
                        }
                        if (succes == true) {
                            let lvl = user[0].lvl
                            jwt.sign({
                                user
                            }, config.privkey, (err, token) => {
                                res.json({token, "level": lvl})
                                res.send();
                            });
                        }
                    });
                } catch {
                    console.log(err);

                    res.sendStatus(500);
                }}
        ).catch(err => {
            console.log(err);
        })
});

// /////////////////////////Test routes////////////////////////////////////////////router.get('/test', VerifyToken.ver, (req, res) => {
// jwt.verify(req.token, config.privkey, (err, AuthData) => {
//     if (err) {
//         res.sendStatus(403);
//     } else {
//         console.log("Uspio");
//         res.json({message: 'UUU', AuthData});
//     }
// })
 module.exports = router;
