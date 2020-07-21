module.exports = MOCKS = {
  providerMap: {
    VIN: 'name',
    make: 'brand',
    model: 'model',
    mileage: 'postalCode',
    year: 'postalCode',
    price: 'price',
    zipCode: 'postalCode'
  },
  row: {
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
  },
  expected: {
    VIN: 'Golf_3_1.6',
    make: 'volkswagen',
    model: 'golf',
    mileage: '70435',
    year: '70435',
    price: '480',
    zipCode: '70435'
  }
}