const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
  title: String,
  text: String,
  review_datetime: { type: Date, default: Date.now },
  book: Schema.Types.ObjectId
  
});

reviewSchema.index({ book: 1, review_datetime: -1 });

module.exports = mongoose.model('Review', reviewSchema);
