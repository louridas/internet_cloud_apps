const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.route('/')
  .post(function(request, response) {
    User.findOne({
      username: request.body.username
      }, function(err, user) {
      if (err) {
        response.send(err);
      } else if (!user) {
        response.json({ success: false, message: 'User not found' });
      } else {
        user.checkPassword(request.body.password, function (err, res) {
          if (err) {
            response.json({ success: false, message: err});
          } else {
            if (!res) {
              response.json({ success: false, message: 'Invalid password' });
            } else {
              var token = jwt.sign(user, request.app.settings['jwt_secret'], {
                expiresIn: "1 day"
              });
              response.json({ success: true, token: token });
            }
          }
        });
      }
    });
  });

module.exports = router;
