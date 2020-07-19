const Car = require('../db/models/Car')
const FileParser = require('../utilities/FileParser')
const connection = require('../db/connection');

const CarController = {
  upload: (req, res) => {
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
    await connection.connect();
    return new Promise((resolve, reject) => {
      Car.insertMany(cars, (error, docs) => {
        if (error) {
          reject(error)
        }
        resolve(docs)
      });
    })
  }

}

module.exports = CarController;
