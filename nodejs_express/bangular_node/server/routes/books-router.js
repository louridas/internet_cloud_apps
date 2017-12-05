const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/books', function(req, res) {
  pool.getConnection(function(err, connection) {
    var sql;
    if (err) {
      res.send(err);
      return;
    }
    if (req.query.title) {
      sql = 'SELECT * FROM djbr_book WHERE title LIKE '
        + connection.escape('%' + req.query.title + '%');
    } else {
      sql = 'SELECT * FROM djbr_book';
    }
    connection.query(sql,
      function(err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send(results);
        }
        connection.release();
    });
  });
});

router.get('/books/:book_id', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.send(err);
      return;
    }
    connection.query('SELECT * FROM djbr_book ' +
      'WHERE id = ?',
      [req.params.book_id],
      function(err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send(results);
        }
        connection.release();
    });
  });
});

router.post('/books', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.send(err);
      return;
    }
    connection.query('INSERT INTO djbr_book SET ' +
      'title = ?, ' +
      'pub_year = ?',
      [ req.body.title, req.body.pub_year ],
      function(err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send(results);
        }
        connection.release();
    });
  });
});

router.delete('/books/:book_id', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) {
      res.send(err);
      return;
    }
    connection.query('DELETE FROM djbr_book ' +
      'WHERE id = ?',
      [req.params.book_id],
      function(err, results, fields) {
        if (err) {
          res.send(err);
        } else {
          res.send(results);
        }
        connection.release();
    });
  });
});


module.exports = router;
