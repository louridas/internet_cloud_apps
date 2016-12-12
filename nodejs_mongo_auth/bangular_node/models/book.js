const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String,
  pub_year: Number
}, { toJSON: { virtuals: true } });

bookSchema.index({ title: 1, pub_year: 1}, { unique: true });

module.exports = mongoose.model('Book', bookSchema);
