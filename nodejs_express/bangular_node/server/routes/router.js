const express = require('express');
const router = express.Router();

const books_router = require('./books-router');

router.use(books_router);

module.exports = router;
