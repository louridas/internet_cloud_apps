const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.route('/books')
  .get(function(req, res) {
    if (req.query.title) {
      Book.find({
        title: new RegExp(req.query.title)
      }, function(err, books) {
        if (err) {
          res.send(err);
        }
        res.json(books);
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

router.route('/books')
  .post(function(req, res) {
    var book = new Book();
    book.title = req.body.title;
    book.pub_year = req.body.pub_year;
    
    book.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  });

router.route('/books/:book_id')
  .get(function(req, res) {
    Book.findById(req.params.book_id, function(err, book) {
      if (err) {
        res.send(err);
      }
      res.json(book);
    });
  });

router.route('/books/:book_id')
  .put(function(req, res) {
    Book.findById(req.params.book_id, function(err, book) {
      if (err) {
        res.send(err);
      }
      book.title = req.body.title;
      book.pub_year = req.body.pub_year;
      book.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json(book);
      });
    });
  });

router.route('/books/:book_id').
  delete(function(req, res) {
    Book.remove({
      _id: req.params.book_id
    }, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  });

module.exports = router;

