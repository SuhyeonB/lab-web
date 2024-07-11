const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schemas/user');
const { makeAccessToken, makeRefreshToken } = require('../utils/token');

const JWT_KEY = process.env.JWT_SECRET;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: ''
        });

        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error);
    }
}));

// Google OAuth 라우트
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    const access_token = makeAccessToken(req.user);
    const refresh_token = makeRefreshToken(req.user);

    res.json({ access_token, refresh_token });
  });

module.exports = router;
