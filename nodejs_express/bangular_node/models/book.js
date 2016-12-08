const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  pub_year: Number
}, { toJSON: { virtuals: true } });

module.exports = mongoose.model('Book', BookSchema);
