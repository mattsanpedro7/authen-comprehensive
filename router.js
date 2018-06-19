module.exports = function(app) {
  // function that handles routes
  // next: mostly for error handling
  app.get('/', function(req, res, next) {
    res.send(['ps4', 'pc', 'asus']);
  });

  
}
