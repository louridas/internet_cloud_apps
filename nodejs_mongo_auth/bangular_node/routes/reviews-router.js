const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Review = require('../models/review');

router.get('/books/:book_id/reviews', function(req, res) {
  Review.find({ book: req.params.book_id })
    .sort({ review_datetime: -1 })
    .exec(function(err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
});

router.post('/books/:book_id/reviews', function(req, res, next) {
  var token = req.get('authorization');
  
  if (token && token.startsWith("JWT ")) {
    token = token.slice(4);
    jwt.verify(token, req.app.get('jwt_secret'), function(err, decoded) {
      if (err) {
        res.status(401).json({ success: false,
                               message: 'Invalid token.'
                             });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
});

router.post('/books/:book_id/reviews', function(req, res) {
  var review = new Review();
  review.title = req.body.title;
  review.text = req.body.text;
  review.book = req.params.book_id;
  review.save(function(err) {
    if (err) {
        res.send(err);
    }
    res.json(review);
  });
});

module.exports = router;

