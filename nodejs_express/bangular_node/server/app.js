var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router = require('./routes/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);

app.use(function (err, req, res, next) {
  if (err) {
    console.error(err.code);
    console.log('While executing: ' + err.sql);
    console.log(err.sqlMessage);
    res.status(500).send({'message': 'Something broke!'});
  }
});

module.exports = app;
