const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User') 
const jwt = require('jsonwebtoken')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        username: profile.displayName.replace(/\s/g, '').toLowerCase(),
        email,
        password: '', //no password for Google users
        provider: 'google'
      })
    }

    //issue JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    return done(null, { user, token })
  } catch (err) {
    return done(err, null)
  }
}))
