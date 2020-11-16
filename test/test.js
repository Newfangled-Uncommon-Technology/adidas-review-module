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