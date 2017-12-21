//Imports
import { Users } from './models/users';

//Consts
const express = require('express');
const router = express.Router();
const objection = require('objection');
const Model = objection.Model;
const Knex = require('knex');

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

router.post('/login', (req, res) => {
    console.log(req.body);
    res.status(200).send(req.body);
});

// ---------------------------------------------------------------------------

module.exports = router;