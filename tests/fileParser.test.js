const connection = require('../src/db/connection');
const FileParser = require('../src/utilities/FileParser');
const Car = require('../src/db/models/Car');

const providerMap = {
  VIN: 'name',
  make: 'brand',
  model: 'model',
  mileage: 'postalCode',
  year: 'postalCode',
  price: 'price',
  zipCode: 'postalCode'
}
const row = {
  dateCrawled: '2016-03-24 11:52:17',
  name: 'Golf_3_1.6',
  seller: 'privat',
  offerType: 'Angebot',
  price: '480',
  abtest: 'test',
  vehicleType: '',
  yearOfRegistration: '1993',
  gearbox: 'manuell',
  powerPS: '0',
  model: 'golf',
  kilometer: '150000',
  monthOfRegistration: '0',
  fuelType: 'benzin',
  brand: 'volkswagen',
  notRepairedDamage: '',
  dateCreated: '2016-03-24 00:00:00',
  nrOfPictures: '0',
  postalCode: '70435',
  lastSeen: '2016-04-07 03:16:57'
}
const expected = {
  VIN: 'Golf_3_1.6',
  make: 'volkswagen',
  model: 'golf',
  mileage: '70435',
  year: '70435',
  price: '480',
  zipCode: '70435'
};

describe('File Parser', () => {
  test('It should generate and object based on the configuration provided', async () => {
    const carData = FileParser.extractDataFromCsvRow(row, providerMap);
    expect(carData).toEqual(expected)
  })

});

describe('DB id adition', () => {
  beforeAll(async () => await connection.connect());
  afterAll(async () => await connection.closeDatabase());

  test('It should add a valid uuid when a car is inserted', async () => {
    const car = new Car(expected)
    const result = await car.save();
    const uuidRegex = new RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}', 'g')
    expect(uuidRegex.test(result._id)).toBe(true)
  });
})
