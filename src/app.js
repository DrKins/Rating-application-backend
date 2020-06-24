//      loading env file
require('dotenv').config();

//      loading dependencies
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
 //     initializing express
 
const app = express();
//      loading middleware
app.use(bodyParser.json());
app.use(cors());

//      Loading routes
const settings = require('./routes/Settings');
const reactions = require('./routes/Reactions');
const users = require('./routes/Users');

//      Initializing routes
app.use('/api/settings/',settings);
app.use('/api/reactions/',reactions);
app.use('/api/users/',users);

const port = process.env.PORT 

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});