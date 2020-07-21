const request = require('supertest');
const App = require('../src/app');
const MOCKS = require("./mocks/mocks");
const filePath = `${__dirname}/mocks/proxiCar.csv`;
let app;


beforeAll(async () => app = await App.getApp());
afterAll(async () => await App.closeDB());

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

  test('It should insert the car info as expected', async () => {
    await request(app)
        .post('/cars')
        .field("provider", "proxiCar")
        .attach('file', filePath)
        .expect(200);

    const expected = MOCKS.expected;
    await request(app)
        .get('/cars')
        .expect(200).then(response => {
          expect(response.body.data[0].VIN).toEqual(expected.VIN);
        })
  })
})
