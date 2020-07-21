const Car = require('../db/models/Car')
const FileParser = require('../utilities/FileParser')

const CarController = {
  post: (req, res) => {
    const fileParams = {
      file: req.files.file,
      provider: req.body.provider,
      providerMap: req.body.providerMap
    }
    FileParser.moveFile(fileParams)
        .then(FileParser.parse)
        .then(CarController.insertAll)
        .then(cars => {
              res.send({success: true, inserted: cars.length})
            }
        )
        .catch(e => {
          res.send({success: false})
          console.log(e);
        })
  },
  insertAll: async (cars) => {
    return new Promise((resolve, reject) => {
      Car.insertMany(cars, (error, docs) => {
        if (error) {
          reject(error)
        }
        resolve(docs)
      });
    })
  },
  get: async (req, res) => {
    try {
      const cars = await Car.find({});
      res.send({success: true, data: cars})
    } catch (e) {
      res.status(500).send({success: false})
    }
  }

}

module.exports = CarController;
