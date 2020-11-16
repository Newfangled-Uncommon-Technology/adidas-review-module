const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const router = require('./router.js');
const path = require('path');

const server = express();
const port = 3001;

server.use(morgan('dev'));
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, '../public')));

server.use('/api', router);

module.exports = server;