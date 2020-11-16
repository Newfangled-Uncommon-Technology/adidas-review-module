const request = require('supertest');
const server = require('../server/app.js');

it('Should get all reviews for a shoe', async done => {
  await request(server).get('/api/reviews/M20324')
  // .expect(response.status).toBe(300)
  .expect("Content-type",/json/)
  .expect(200)
  .then(response => {
    expect(response.body[0].reviewCount).toBe(100)
  })
  done();
})

it('Should increment the yes count of a review', async done => {
  var initialYes;
  var postYes;
  var yesWorks;

  await request(server).get('/api/reviews/M20324')
  .then(response => {
    initialYes = response.body[0].yesCount[0]
  })

  await request(server).put('/api/reviews/yes/M20324')
  .send({
    "reviewId": 0,
    "increment": 1
  })

  await request(server).get('/api/reviews/M20324')
  .then(response => {
    postYes = response.body[0].yesCount[0]
  })

  .then(() => {
    yesWorks = (postYes === (initialYes + 1))
    console.log(yesWorks)
  })

  await request(server).put('/api/reviews/yes/M20324')
  .send({
    "reviewId": 0,
    "increment": -1
  })

  .then(() => {
    expect(yesWorks)
  })

  done();
})