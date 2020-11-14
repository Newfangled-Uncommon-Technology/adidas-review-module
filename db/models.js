const reviewsDB = require('./reviews.js');
const reviewStatsDB = require('./reviewStats.js');

const list = {
  getAllReviews: () => {
    return(reviewsDB.find( {} ))
  },
  deleteAllReviews: () => {
    return(reviewsDB.remove( {} ))
  },
  getSomeReviews: (id) => {
    return(reviewsDB.find( {shoeIds: {$in: [id]}} ))
  },
  getAllReviewStats: () => {
    return(reviewStatsDB.find( {} ))
  },
  getSomeReviewStats: (id) => {
    return(reviewStatsDB.find( {shoeIds: {$in: [id]}} ))
  }
};

module.exports = list;