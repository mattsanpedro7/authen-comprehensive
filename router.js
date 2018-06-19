const Authentication = require('./controllers/authentication');

module.exports = function(app) {
  // function that handles routes
  // next: mostly for error handling
  app.post('/signup', Authentication.signup);
  

}
