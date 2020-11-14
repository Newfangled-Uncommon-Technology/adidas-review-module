const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost/adidas';

mongoose.Promise = global.Promise;

const db = mongoose.connect(mongooseURI)
.then(() => console.log('connected to mongo'));

const reviewsSchema = mongoose.Schema({
  shoeIds: [String],
  reviewCount: Number,
  reviewId: [Number],
  username: [String],
  title: [String],
  text: [String],
  yesCount: [Number],
  noCount: [Number],
  date: [String],
  starRating: [Number],
  sizeRating: [Number],
  widthRating: [Number],
  comfortRating: [Number],
  qualityRating: [Number]
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;