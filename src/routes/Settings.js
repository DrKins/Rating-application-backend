//      Loading dependencies

const express = require('express');
const timestamp = require('time-stamp');
//      Loading methods
const verification = require('../methods/VerifyToken');

//      Loading Querries
const Queries = require('../querries/Queries');
let queries = new Queries();

const router = express.Router();

router.get('/getsettings',(req,res) => {
    queries.GetSettings()
    .then(result => {
        res.status(200);
        res.end(result);
    })
    .catch(err => {
        console.log(err);
      });
});

router.post('/setsettings',verification.ver,(req,res) => {
    jwt.verify(req.token,process.env.PRIVATE_KEY,(err,AuthData)=> {
        if(err){
            res.sendStatus(403);
        }else{
            queries.UpdateSetting(req.body)
            console.log("Settings updated");
            res.status(200).send();
        }
    })
});

module.exports = router;
