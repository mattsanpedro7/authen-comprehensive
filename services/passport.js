// authen user when attempt to visit route that requires authen

// passport not just lib, an ecosystem of strategies
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
// 1st argument: expect username and password by default
// 2nd argument: callback function
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // verufy email and password, call done with the user
    // if it is the correct email and passowrd
    // otherwise, call done with false
    User.findOne( {email: email }, function(err, user) {
        if (err) {return done(err); }
        if (!user) { return done(null, false); }

        // compare passwords - is 'password' = user.password?
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});

// setup options for JWT strategy
// 1. expecting JwtStrategy is going to get access to jwt off req
// 2. specfically tell strategy where to look on req to find key
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // need to tell secret to decode token
    secretOrKey: config.secret
};

// create JWT strategy
// payload is decoded jwt token
// done is callback function
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // see if the user ID in the payload exists in our databse
    // if it does, call 'done' with that user
    // otherwise, call done without a user object
    User.findById(payload.sub, function(err, user) {
        if (err) {return done(err, false);}
        
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);