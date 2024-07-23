const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../utils/passport');

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if (req.user) {
      const access_token = makeAccessToken(req.user);
      const refresh_token = makeRefreshToken(req.user);
      res.status(200).json({
        success: true,
        access_token: access_token,
        refresh_token: refresh_token
      });
    } else {
      res.status(401).json({ success: false, message: "Authentication failed" });
    }
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
