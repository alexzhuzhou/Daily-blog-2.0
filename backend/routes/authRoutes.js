const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require('passport')
require('../services/passport') 

router.post("/register", authController.register);
router.post("/login", authController.login);


// Google OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Step 2: Handle callback
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    //successful login, send token to frontend
    const { user, token } = req.user
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`)
  }
)

module.exports = router;
