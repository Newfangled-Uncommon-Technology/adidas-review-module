const reviewsDB = require('./reviews.js');
const reviewStatsDB = require('./reviewStats.js');

const list = {
  getAllReviews: () => {
    return(reviewsDB.find( {} ))
  },
  deleteAllReviews: () => {
    return(reviewsDB.remove( {} ))
  },
  // getReviewsById:
  getAllReviewStats: () => {
    return(reviewStatsDB.find( {} ))
  }
};

module.exports = list;