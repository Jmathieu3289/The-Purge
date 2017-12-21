// set up =================================================================
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// get api routes
const api = require('./server/routes/api');

// configuration ===========================================================

// middleware for session data
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// parser for cookie data
app.use(cookieParser());

// parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// point static path to public
app.use(express.static(path.join(__dirname, 'public')));

// set our api routes
app.use('/api', api);

// catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const Users = require('./server/routes/models/users');
require('./server/config/passport/passport')(passport, Users);

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