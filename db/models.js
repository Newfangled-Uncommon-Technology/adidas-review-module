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
  updateYes: (id, theHolyString, increment) => {
    return(reviewsDB.findOneAndUpdate({shoeIds: {$in: [id]}}, {$inc: {[theHolyString]: increment}}))
  },
  updateNo: (id, theHolyString, increment) => {
    return(reviewsDB.findOneAndUpdate({shoeIds: {$in: [id]}}, {$inc: {[theHolyString]: increment}}))
  },
  getAllReviewStats: () => {
    return(reviewStatsDB.find( {} ))
  },
  deleteAllReviewStats: () => {
    return(reviewStatsDB.remove( {} ))
  },
  getSomeReviewStats: (id) => {
    return(reviewStatsDB.find( {shoeIds: {$in: [id]}} ))
  }
};

module.exports = list;