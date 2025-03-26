const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose); // adds username, hash, salt, etc.
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
