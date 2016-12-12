const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const app = require('../app');
const User = require('../models/user');

router.route('/api-token-auth')
  .post(function(req, res) {
    User.findOne({
      username: req.body.username
      }, function(err, user) {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.json({ success: false, message: 'User not found' });
      } else {
        if (user.checkPassword(req.body.password)) {
          res.json({ success: false, message: 'Invalid password' });
        } else {
          var token = jwt.sign(user, app.get('jwt_secret'), {
            expiresInMinutes: 1440
          });
          res.json({ success: true, token: token });
        }
      }
    });
  });

module.exports = router;
