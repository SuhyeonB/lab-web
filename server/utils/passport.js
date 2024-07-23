const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../schemas/user');
const { makeAccessToken, makeRefreshToken } = require('./token');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
      });
      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error);
    }
  }
));

module.exports = passport;
