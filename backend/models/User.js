const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: String,
  googleId: String
});

userSchema.plugin(passportLocalMongoose); // adds username, hash, salt, etc.
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);
