"use strict;"
const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../db');
const config_jwt = require('../config-jwt');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config_jwt.secret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  return done(null, true);
}));

function response_handler(err, res, results,  next) {
  if (!err) {
    res.send(results);
  } else {
    next(err);
  } 
}

router.get('/', function(req, res, next) {
  var sql;
  if (req.query.title) {
    sql = 'SELECT * FROM djbr_book WHERE title LIKE '
      + pool.escape('%' + req.query.title + '%');
    } else {
      sql = 'SELECT * FROM djbr_book';
    }
  pool.query(
    sql,
    (err, results, fields) => response_handler(err, res, results, next)    
  );
});

router.post('/', function(req, res, next) {
  pool.query(
    'INSERT INTO djbr_book SET ' +
    'title = ?, ' +
    'url = ?, ' +
    'pub_year = ?',
    [ req.body.title, req.body.url, req.body.pub_year ],
    (err, results, fields) => response_handler(err, res, results, next)
  );
});

router.get('/:book_id', function(req, res, next) {
  pool.query(
    'SELECT * FROM djbr_book ' +
    'WHERE id = ?',
    [req.params.book_id],
    (err, results, fields) => response_handler(err, res, results, next)    
  );
});

router.delete('/:book_id', function(req, res, next) {
  pool.query(
    'DELETE FROM djbr_book ' +
    'WHERE id = ?',
    [req.params.book_id],
    (err, results, fields) => response_handler(err, res, results, next)
  );
});

router.get('/:book_id/reviews', function(req, res, next) {
  pool.query(
    'SELECT * FROM djbr_review ' +
    'WHERE book_id = ?',
    [req.params.book_id],
    (err, results, fields) => response_handler(err, res, results, next)    
  );
});

router.post(
  '/:book_id/reviews',
  passport.authenticate('jwt', {session: false}),
  function(req, res, next) {
    var review_date = new Date();
    pool.query(
      'INSERT INTO djbr_review SET ' +
      'book_id = ?, ' +	
      'title = ?, ' +
      'text = ?, ' +
      'review_date = ?',
      [ req.params.book_id, req.body.title, req.body.text, review_date ],
      (err, results, fields) => {
	var inserted_review = results;
	if (!err) {
	  inserted_review = {
	    id: results.insertId,
	    book_id: req.params.book_id,
	    title: req.body.title,
	    text: req.body.text,
	    review_date: review_date
	  }
	}
	response_handler(err, res, inserted_review, next);
      }
    );
});


module.exports = router;
