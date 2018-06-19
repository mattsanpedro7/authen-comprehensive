// main starting point of app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

// create instance of express
const app = express();

// App setup
// get express working
// boilerplate 
// morgan and bodyparser are middleware (incoming req passed into)
// morgan is a logging framework
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup
// express talking to outside
// define a port
const port = process.env.PORT || 3090;
// http lib native node; working low level for http req
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);