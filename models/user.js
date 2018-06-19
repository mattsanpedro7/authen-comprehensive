const mongoose = require('mongoose');

// schema particular fields model has
const Schema = mongoose.Schema;

// define our model
// email should be unique
const userSchema = new Schema({
  // lowercase: first turn to powercase when email is saved
  email: { type: String, unique: true, lowercase: true }, 
  password: String
});

// create model class - represents all users
const ModelClass = mongoose.model('user', userSchema);


// export the model
module.exports = ModelClass; 