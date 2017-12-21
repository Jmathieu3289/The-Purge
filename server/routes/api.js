//Imports
const Users = require('./models/users');

//Consts
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Initialize knex connection. Make sure your .env file has correct keys.
const knex = Knex({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
});

// Give the connection to objection.
Model.knex(knex);

// --- API -----------------------------------------------------------------

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('');
});

router.get('/users', (req, res) => {
    Users.query().then(users => {
        res.status(200).send(users);
    });
});

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

router.post('/login', passport.authenticate('local-signin', {
}));

/*router.post('/login', (req, res) => {

    var response = {
        data: null,
        errors: []
    };

    if (req.body.email == null || req.body.password == null) {
        response.errors.push('Invalid email or password.');
        res.status(200).send(response);
    } else {
        Users
            .query()
            .where('email', '=', req.body.email)
            .then(user => {
                if (user == null || user.length == 0) {
                    response.errors.push('Invalid email or password.');
                    res.status(200).send(response);
                } else {
                    var u = user[0];
                    var that = this;
                    bcrypt.compare(req.body.password, u.password, function (err, r) {
                        if (r) {
                            delete u.password; //Don't send the user their own encrypted password.
                            response.data = u;
                        } else {
                            response.errors.push('Invalid email or password.');
                        }
                        res.status(200).send(response);
                    });
                }
            });
    }
});*/

// ---------------------------------------------------------------------------

module.exports = router;