// authen user when attempt to visit route that requires authen

// passport not just lib, an ecosystem of strategies
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// setup options for JWT strategy
const jwtOptions = {};

// create JWT strategy
// payload is decoded jwt token
// done is callback function
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // see if the user ID in the payload exists in our databse
    // if it does, call 'done' with that user
    // otherwise, call done without a user object
});

// tell passport to use this strategy