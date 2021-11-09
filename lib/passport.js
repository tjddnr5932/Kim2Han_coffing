const auth = require('../routes/auth');
const crypto = require('crypto');

module.exports = function(app){

    const mysql = require('mysql');
    const db = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'zjvld1234!',
        database : 'coffing_database'
    });

    const passport = require('passport');
    LocalStrategy = require('passport-local').Strategy;


    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        user = { id:id };
        done(null, user);
    });


    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pw'
        },
        function (username, password, done){
            password = crypto.createHash('sha512').update(password).digest('base64');
            db.query('SELECT id, password from user', function (error, result, fields){
                var i = 0;
                while(i<result.length){
                    if(username===result[i].id && password===result[i].password){  
                        return done(null, result[i]);
                    }
                    i++;
                }
                return done(null, false);
            });
        }
    ));
    return passport;
}