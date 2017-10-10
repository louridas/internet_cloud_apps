const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = require('./review');

var bookSchema = new Schema({
  title: String,
  pub_year: Number
}, { toJSON: { virtuals: true } });

bookSchema.index({ title: 1, pub_year: 1}, { unique: true });

bookSchema.pre('remove', true, function(next, done) {
  
  var book = this;

  Review.remove({
    book: book._id
  }, function(err, result) {
    if (err) {
      console.log('Could not remove associated reviews');
      next(err);
      done();
    } else {
      next();
      done();
    }
  });
});

module.exports = mongoose.model('Book', bookSchema);
