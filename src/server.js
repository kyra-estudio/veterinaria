const express = require('express');
const routes = require('./routes');
const cors = require("cors")

const server = express();


//Settings
server.use (express.json())
server.use (cors())
server.use(express.urlencoded ({extended: false}))


//Routtes
server.use(routes.cli)
server.use(routes.dog)

//Public folder

module.exports = server;
