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
    console.log(theHolyString);
    list.updateYes(req.params.id, theHolyString, req.body.increment)
    .then((results) => {
      res.status(200).send(`added to the yes counter of shoe ${req.params.id}, review ${req.body.reviewId}. New value is ${results.yesCount[req.body.reviewId]}`)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  },
  updateNo: (req, res) => {
    var theHolyString = `noCount.${req.body.reviewId}`;
    list.updateNo(req.params.id, theHolyString, req.body.increment)
    .then((results) => {
      res.status(200).send(`added to the no counter of shoe ${req.params.id}, review ${req.body.reviewId}. New value is ${results.noCount[req.body.reviewId]}`)
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
  deleteAllReviewStats: (req, res) => {
    list.deleteAllReviewStats()
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