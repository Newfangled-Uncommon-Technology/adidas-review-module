const request = require('supertest');
const server = require('../server/app.js');

it('Should get all reviews for a shoe', async done => {
  var response = await request(server).get('/api/reviews/M20324')
  .expect(200);
  // .expect(response.status).toBe(200);
  done();
})