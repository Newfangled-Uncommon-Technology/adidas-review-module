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
  getAllReviewStats: (req, res) => {
    list.getAllReviewStats()
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  }
}

module.exports = controller;