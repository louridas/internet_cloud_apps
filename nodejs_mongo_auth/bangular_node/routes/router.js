const express = require('express');
const router = express.Router();

const books_router = require('./books-router');
const reviews_router = require('./reviews-router');

router.use(books_router);
router.use(reviews_router);

module.exports = router;
