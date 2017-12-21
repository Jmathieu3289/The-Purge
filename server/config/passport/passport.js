const bcrypt = require('bcrypt');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
            };

            User.query().findOne('email', '=', email).then(u => {
                if (u) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: password,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name
                    };

                    User.insert(data).then(newUser => {
                        if (!newUser) {
                            return done(null, false);
                        } else {
                            return done(null, newUser);
                        }
                    });
                }
            })

        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var isValidPassword = function (userpass, password) {
                return bcrypt.compareSync(password, userpass)
            };

            User.query().findOne('email', '=', email).then(u => {
                if (!u) {
                    return done(null, false, {
                        message: 'That email does not exist'
                    });
                } else {
                    if (!isValidPassword(u.password, password)) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                    delete u.password;
                    return done(null, u);
                }
            })

        }
    ));

}