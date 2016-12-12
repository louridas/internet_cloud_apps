const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.get('/books', function(req, res) {
  var query = Book.find({});
  if (req.query.title) {
    query.where('title').equals(new RegExp(req.query['title']));
  }
  query.exec(function(err, books) {
    if (err) {
      res.send(err);
    } else {
      res.json(books);
    }
  });
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
  Book.remove({
    _id: req.params.book_id
  }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;

