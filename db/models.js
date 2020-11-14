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
  updateYes: (id, theHolyString) => {
    return(reviewsDB.findOneAndUpdate({shoeIds: {$in: [id]}}, {$inc: {[theHolyString]: 1}}))
  },
  updateNo: (id, theHolyString) => {
    return(reviewsDB.findOneAndUpdate({shoeIds: {$in: [id]}}, {$inc: {[theHolyString]: 1}}))
  },
  getAllReviewStats: () => {
    return(reviewStatsDB.find( {} ))
  },
  getSomeReviewStats: (id) => {
    return(reviewStatsDB.find( {shoeIds: {$in: [id]}} ))
  }
};

module.exports = list;