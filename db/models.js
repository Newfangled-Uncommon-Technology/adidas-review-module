const reviewsDB = require('./reviews.js');
const reviewStatsDB = require('./reviewStats.js');

const list = {
  getAllReviews: () => {
    return(reviewsDB.find( {} ))
  },
  // getReviewsById:
  getAllReviewStats: () => {
    return(reviewStatsDB.find( {} ))
  }
};

module.exports = list;