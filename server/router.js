const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/allReviews')
  .get(controller.getAllReviews)
  .delete(controller.deleteAllReviews)

router
  .route('/allReviewStats')
  .get(controller.getAllReviewStats)
  .delete(controller.deleteAllReviewStats)

router
  .route('/reviews/:id')
  .get(controller.getSomeReviews)

router
  .route('/reviews/yes/:id')
  .put(controller.updateYes)

router
  .route('/reviews/no/:id')
  .put(controller.updateNo)

router
  .route('/reviewStats/:id')
  .get(controller.getSomeReviewStats)

module.exports = router;