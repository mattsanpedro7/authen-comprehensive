const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// object occurs in middle between incoming req and route handler
// session: false => when user is authen, don't create a authen cookie
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' })
  });
  // function that handles routes
  // next: mostly for error handling
  app.post('/signup', Authentication.signup);
  

}
