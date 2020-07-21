const request = require('supertest');
const App = require('../src/app');
let app;

beforeAll(async (done) => {
  app = await App.getApp();
  done()
});

afterAll(async (done) => {
  await App.closeDB()
  done();
});

describe('Upload Test', () => {
  test('It should validate empty POST request', async () => {
    await request(app)
        .post('/cars')
        .send({})
        .expect(400);
  })

  test('It should validate missing file param', async () => {
    await request(app)
        .post('/cars')
        .send({provider: 'test'})
        .expect(400);
  })
})