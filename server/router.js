const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/allReviews')
  .get(controller.getAllReviews)
  .delete(controller.deleteAllReviews)

router
  .route('/allReviewStats')
  .get(controller.getAllReviewStats)

module.exports = router;