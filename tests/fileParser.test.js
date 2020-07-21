const connection = require('../src/db/connection');
const FileParser = require('../src/utilities/FileParser');
const Car = require('../src/db/models/Car');
const MOCKS = require("./mocks/mocks");


describe('File Parser', () => {
  test('It should generate and object based on the configuration provided', async () => {
    const carData = FileParser.extractDataFromCsvRow(MOCKS.row, MOCKS.providerMap);
    expect(carData).toEqual(MOCKS.expected)
  })

});

describe('DB id adition', () => {
  beforeAll(async () => await connection.connect());
  afterAll(async () => await connection.closeDatabase());

  test('It should add a valid uuid when a car is inserted', async () => {
    const car = new Car(MOCKS.expected)
    const result = await car.save();
    const uuidRegex = new RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}', 'g')
    expect(uuidRegex.test(result._id)).toBe(true)
  });
})
