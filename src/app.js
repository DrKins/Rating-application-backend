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

//    Initializing swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//      Loading routes
const settings = require('./routes/Settings');
const reactions = require('./routes/Reactions');
const users = require('./routes/Users');


app.use(function(req,res,next){
  req.io = io;
  next();
  })

//      Initializing routes
app.use('/api/settings/', settings);
app.use('/api/reactions/', reactions);
app.use('/api/users/', users);

 http.createServer(app).listen(config.port, () => {
    console.log(`Listening on ${
        config.port
    }`);
});
 
const slack = require('./slack');

const server = https.createServer({
  key: fs.readFileSync(config.location_key),
  cert: fs.readFileSync(config.location_cert),
  ca: fs.readFileSync(config.location_chain)
}, app).listen(config.port2, () => {
  console.log(`Listening on ${config.port2}`);
})

const io = require('socket.io')(server);
io.on("connection",(socket)=>{ 
  console.log("korisnik konektovan"+socket);
})