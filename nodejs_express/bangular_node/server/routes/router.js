const express = require('express');
const router = express.Router();

const books_router = require('./books-router');
const login_router = require('./login-router');

router.use('/books', books_router);

router.use('/token', login_router);

module.exports = router;
