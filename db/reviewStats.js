const mongoose = require('mongoose');
const mongooseURI = 'mongodb://localhost/adidas';

mongoose.Promise = global.Promise;

const db = mongoose.connect(mongooseURI)
.then(() => console.log('connected to mongo'));

const reviewStatsSchema = mongoose.Schema({
  shoeIds: [String],
  reviewCount: Number,
  averageRating: Number,
  averageStar: Number,
  fiveStar: Number,
  fourStar: Number,
  threeStar: Number,
  twoStar: Number,
  oneStar: Number,
  satisfactionPercent: Number,
  averageSize: Number,
  averageWidth: Number,
  averageComfort: Number,
  averageQuality: Number
});

const ReviewStats = mongoose.model('ReviewStats', reviewStatsSchema);

module.exports = ReviewStats;