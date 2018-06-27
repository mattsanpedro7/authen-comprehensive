const mongoose = require('mongoose');
// schema particular fields model has
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
// email should be unique
const userSchema = new Schema({
  // lowercase: first turn to powercase when email is saved
  email: { type: String, unique: true, lowercase: true }, 
  password: String
});

// on save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next) {
  // access to user model
  const user = this;

  // generate a salt, then run callback
  bcrypt.genSalt(12, function(err, salt) {
    if (err) { return next(err); }

    // hash (encrypt) our password using the salt (random gen string of char)
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text pas with encrypted
      user.password = hash;
      // go ahead save the model
      next();
    });
  })
});

// whatever we define, have access to methods property
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // this references user model
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// create model class - represents all users
const ModelClass = mongoose.model('user', userSchema);


// export the model
module.exports = ModelClass; 