//      loading env file
require('dotenv').config();

//      loading dependencies
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const https = require('https');
const fs = require('fs')

 //     initializing express
 
const app = express();
//      loading middleware
app.use(bodyParser.json());
app.use(cors());
 //     Testing 
 const httpsServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  },app);

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
const port2 = 5000;
httpsServer.listen(port2,()=>{
    console.log("https running");
})
