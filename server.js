// set up =================================================================
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

// get api routes
const api = require('./server/routes/api');

// configuration ===========================================================

// parsers for POST data
app.use(cookieParser());
app.use(bodyParser.json());

// middleware for session data
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// point static path to public
app.use(express.static(path.join(__dirname, 'public')));

// set our api routes
app.use('/api', api);

// catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const Users = require('./server/routes/models/users');

/**
 * get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * create HTTP server.
 */
const server = http.createServer(app);

/**
 * listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));