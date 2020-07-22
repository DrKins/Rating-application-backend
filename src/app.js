//      loading env file
const config = require('../config');

//      loading dependencies
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');



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




const server =  http.createServer(app).listen(config.port, () => {
  console.log(`Listening on ${config.port}`);
});
const io = require('socket.io')(server);
app.set('io', io);

/*
https.createServer({
  key: fs.readFileSync(config.location_key),
  cert: fs.readFileSync(config.location_cert),
  ca: fs.readFileSync(config.location_chain)
}, app).listen(config.port2, () => {
  console.log(`Listening on ${config.port2}`);
})*/