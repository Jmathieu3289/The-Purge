//Imports
const Users = require('./models/users');
const Progress = require('./models/progress');
const ProgressHistory = require('./models/progress_history');
const Categories = require('./models/categories');
const Response = require('./models/response');

const requireAuthentication = function (request, response) {
    if (request.session.user == undefined) {
        response.errors.push('Not authorized');
    }
}

//Consts
const express = require('express');
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

router.get('/categories', (req, res) => {

    var response = new Response();

    requireAuthentication(req, response);

    if (response.errors == null) {
        Categories.query().then(categories => {
            response.data = categories;
            res.status(200).send(response);
        });
    }

});

/* -- PROGRESS -- */

// Get Progress
router.get('/progress', (req, res) => {

    var response = new Response();

    //Must be logged in to get user details
    if (req.session.user == undefined) {
        response.errors.push('Not authorized');
        res.status(200).send(response);
    }

    Progress
        .query()
        .where('user_id', '=', req.session.user.id)
        .orderBy('sort_order')
        .then(progress => {
        response.data = progress;
        res.status(200).send(response);
    });

});

// New Progress
router.post('/progress', (req, res) => {

    var response = new Response();

    requireAuthentication(req, response);

    if (req.body.category == null) {
        response.errors.push('category required');
    }

    if (req.body.max_count == null) {
        response.errors.push('max_count required');
    }

    if (response.errors.length > 0) {
        res.status(200).send(response);
    }

    Progress
        .query()
        .where('category', '=', req.body.category)
        .andWhere('user_id', '=', req.session.user.id)
        .then(async progress => {
            if (progress.length == 0) {
                Progress
                    .query()
                    .insert({
                        user_id: req.session.user.id,
                        category: req.body.category,
                        current_count: 0,
                        max_count: req.body.max_count,
                        credits: 0
                    }).then(async new_progress => {
                        response.data = new_progress;
                        res.status(200).send(response);
                    });
            } else {
                response.errors.push('category already exists.');
                res.status(200).send(response);
            }
        })
        .catch(err => {
            response.errors.push(err);
            res.status(200).send(response);
        });

});

// Update Progress
router.patch('/progress/:id', (req, res) => {

    var response = new Response();

    requireAuthentication(req, response);

    if (req.params.id == null) {
        response.errors.push('id required');
    }

    if (req.body.category == null) {
        response.errors.push('category required');
    }

    if (req.body.max_count == null) {
        response.errors.push('max_count required');
    }

    if (response.errors.length > 0) {
        res.status(200).send(response);
    }

    Progress
        .query()
        .where('id', '=', req.params.id)
        .andWhere('user_id', '=', req.session.user.id)
        .then(async currentProgress => {
            if (currentProgress.length > 0) {

                var progress = currentProgress[0];
                var credits = progress.credits;
                var currentCount = progress.current_count;

                if (currentCount >= req.body.max_count) {
                    credits = progress.credits + Math.floor((progress.current_count) / req.body.max_count);
                    currentCount = (progress.current_count) % req.body.max_count;
                }

                Progress
                    .query()
                    .patchAndFetchById(req.params.id, {
                        category: req.body.category,
                        max_count: req.body.max_count,
                        current_count: currentCount,
                        credits: credits,
                        sort_order: req.body.sort_order
                    }).then(async updated_progress => {
                        response.data = updated_progress;
                        res.status(200).send(response);
                    });
            } else {
                response.errors.push('category does not exists.');
                res.status(200).send(response);
            }
        })
        .catch(err => {
            response.errors.push(err);
            res.status(200).send(response);
        });

});

// Delete Progress
router.delete('/progress/:id', (req, res) => {

    var response = new Response();

    requireAuthentication(req, response);

    if (req.params.id == null) {
        response.errors.push('id required');
    }

    if (response.errors.length > 0) {
        res.status(200).send(response);
        return;
    }

    Progress
        .query()
        .delete()
        .where('id', '=', req.params.id)  
        .then(async numDeleted => {
            response.data = numDeleted;
            res.status(200).send(response);
        })
        .catch(err => {
            response.errors.push(err);
            res.status(200).send(response);
        });

});

router.post('/purge', (req, res) => {

    var response = new Response();

    requireAuthentication(req, response);

    if (req.body.progress_id == null) {
        response.errors.push('progress_id required');
    }

    if (req.body.amount == null) {
        response.errors.push('amount required');
    }

    if (response.errors.length > 0) {
        res.status(200).send(response);
    }

    //Get the existing progress first
    Progress
        .query()
        .findOne('id', '=', req.body.progress_id)
        .then(async progress => {
            if (progress != null) {

                //Insert progress history entry
                ProgressHistory
                    .query()
                    .insert({
                        progress_id: progress.id,
                        amount: req.body.amount,
                        notes: req.body.notes,
                        history_type: 1,
                        history_date: new Date()
                    }).then(async new_progress_history => {
                    });

                //Update progress
                var newCredits = progress.credits + Math.floor((progress.current_count + req.body.amount) / progress.max_count);
                var newCurrentCount = (progress.current_count + req.body.amount) % progress.max_count;

                const progressID = await Progress
                    .query()
                    .patchAndFetchById(progress.id, { current_count: newCurrentCount, credits: newCredits });
                
                response.data = progressID;
                
                res.status(200).send(response);
                
            } else {
                response.errors.push('progress id not found');
                res.status(200).send(response);
            }
        })
        .catch(err => {
            response.errors.push(err);
            res.status(200).send(response);
        });


});

router.post('/spend', (req, res) => {

    var response = new Response();

    requireAuthentication(req, response);

    if (req.body.progress_id == null) {
        response.errors.push('progress_id required');
    }

    if (req.body.amount == null) {
        response.errors.push('amount required');
    }

    if (response.errors.length > 0) {
        res.status(200).send(response);
    }

    //Get the existing progress first
    Progress
        .query()
        .findOne('id', '=', req.body.progress_id)
        .then(async progress => {
            if (progress != null) {

                //Insert progress history entry
                ProgressHistory
                    .query()
                    .insert({
                        progress_id: progress.id,
                        amount: req.body.amount,
                        notes: req.body.notes,
                        history_type: 2,
                        history_date: new Date()
                    }).then(async new_progress_history => {
                    });

                //Update progress
                var newCredits = progress.credits - req.body.amount;

                const progressID = await Progress
                    .query()
                    .patchAndFetchById(progress.id, { credits: newCredits });

                response.data = progressID;

                res.status(200).send(response);

            } else {
                response.errors.push('progress id not found');
                res.status(200).send(response);
            }
        })
        .catch(err => {
            response.errors.push(err);
            res.status(200).send(response);
        });

});

router.get('/progress_history', (req, res) => {

    var response = new Response();

    requireAuthentication(req, response);

    if (response.errors.length == 0) {
        ProgressHistory
            .query()
            .join('progress as p', 'progress_history.progress_id', 'p.id')
            .join('users as u', 'p.user_id', 'u.id')
            .where('u.id', '=', req.session.user.id)
            .then(progressHistory => {
                response.data = progressHistory;
                res.status(200).send(response);
            });
    } else {
        res.status(200).send(response);
    }

});

/* -- END PROGRESS -- */

/* -- SESSION MANAGEMENT --*/

router.get('/session', (req, res) => {

    var response = new Response();

    if (req.session.user == null) {
        response.errors.push('No session');
    }

    res.status(200).send(response);

});

router.post('/register', (req, res) => {
});

router.post('/logout', (req, res) => {

    var response = new Response();

    req.session.destroy((err) => {
        if (err) {
            response.errors.push(err);
        }
        res.status(200).send(response);
    });
    
});

router.post('/login', (req, res) => {

    var response = new Response();

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
                    bcrypt.compare(req.body.password, u.password, function (err, r) {
                        if (r) {
                            delete u.password; //Don't send the user their own encrypted password.
                            response.data = u;

                            //Set session data
                            req.session.user = u;

                        } else {
                            response.errors.push('Invalid email or password.');
                        }
                        res.status(200).send(response);
                    });
                }
            });
    }
});

/* -- END SESSION MANAGEMENT --*/

// ---------------------------------------------------------------------------

module.exports = router;