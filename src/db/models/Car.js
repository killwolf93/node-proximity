const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {v4: uuidv4} = require('uuid');


const carSchema = new Schema({
  _id: {
    type: String, default: function genUUID() {
      return uuidv4()
    }
  },
  VIN: String,
  make: String,
  model: String,
  mileage: Number,
  year: Number,
  price: Number,
  zipCode: Number,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;

