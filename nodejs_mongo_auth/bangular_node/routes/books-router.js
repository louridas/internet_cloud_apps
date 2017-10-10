const express = require('express');
const router = express.Router();

const Book = require('../models/book');
const Review = require('../models/review');

router.get('/books', function(req, res) {
  if (req.query.title) {
    Book.find({
      title: new RegExp(req.query.title)
    }, function(err, books) {
      if (err) {
        res.send(err);
      } else {
        res.json(books);
      }
    });
  } else {
    Book.find(function(err, books) {
      if (err) {
        res.send(err);
      }
      res.json(books);
    });
  }
});

router.post('/books', function(req, res) {
  var book = new Book();
  book.title = req.body.title;
  book.pub_year = req.body.pub_year;
  book.save(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json(book);
    }
  });
});

router.get('/books/:book_id', function(req, res) {
  Book.findById(req.params.book_id, function(err, book) {
    if (err) {
      res.send(err);
    } else {
      res.json(book);
    }
  });
});

router.delete('/books/:book_id', function(req, res) {
  Book.findById(req.params.book_id, function(err, book) {
    if (err) {
      res.send(err);
    } else {
      book.remove(function(err, book) {
        if (err) {
          res.send(err);
        } else {
          res.json(book);
        }
      });
    }
  });
});

module.exports = router;
