// pull req/res logic here
const User = require('../models/user');

exports.signup = function (req, res, next) {
  // req.body : anything contained in post req
  // see if a user with given email exists
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    // return res.status(422).send( { error: 'You must provide email and password' })
    send422('You must provide email and password');
  } else if (email.length < 3) {
    send422('You must provide a valid email account');
  } else if (password.length < 8) {
    send422('Please provide a password of at least 8 characters');
  }

  User.findOne({
    email: email
  }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    
    // if a user with email does exist, return an error
    if (existingUser) {
      //  422 - unprocessible entity
      send422('Email is in use');
    }

    // if user with email, does not exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err) }

      // respond to request indicating user was created
      res.json({ success: 'true'} );

    });

  });

  function send422(str) {
    return res.status(422).send({ error: str });
  }

}