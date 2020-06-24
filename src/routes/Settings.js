//      Loading dependencies

const express = require('express');
const timestamp = require('time-stamp');

//      Loading Querries
const Queries = require('../querries/Queries');
let queries = new Queries('postavke');

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
router.post('/setsettings',(req,res) => {
    queries.UpdateSetting(req.body)
    console.log("Settings updated");
    res.status(200).send();
});

module.exports = router;