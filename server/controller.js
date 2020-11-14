const list = require('../db/models.js');

const controller = {
  getAllReviews: (req, res) => {
    list.getAllReviews()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  deleteAllReviews: (req, res) => {
    list.deleteAllReviews()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  getSomeReviews: (req, res) => {
    list.getSomeReviews(req.params.id)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  updateYes: (req, res) => {
    var theHolyString = `yesCount.${req.body.reviewId}`;
    list.updateYes(req.params.id, theHolyString)
    .then(() => {
      res.status(200).send(`added to the yes counter of shoe ${req.params.id}, review ${req.body.reviewId}`)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  updateNo: (req, res) => {
    list.updateNo(req.params.id)
    .then(() => {
      res.status(200).send(`added to the no counter of review ${req.params.id}`)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  getAllReviewStats: (req, res) => {
    list.getAllReviewStats()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  getSomeReviewStats: (req, res) => {
    list.getSomeReviewStats(req.params.id)
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  }
}

module.exports = controller;