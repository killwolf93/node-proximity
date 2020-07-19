const request = require('supertest');
const app = require('../src/app')

describe('Upload Test', () => {
  test('It should validate empty POST request', async () => {
    await request(app)
        .post('/upload')
        .send({})
        .expect(400);
  })

  test('It should validate missing file param', async () => {
    await request(app)
        .post('/upload')
        .send({provider:'test'})
        .expect(400);
  })
})