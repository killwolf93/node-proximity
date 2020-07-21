const CarController = require('./controllers/CarController')
const Validator = require('./middleware/validator')
const express = require('express')
const fileUpload = require('express-fileupload');

const connection = require('../src/db/connection');

const App = {
  getApp: async () => {
    const app = express()
    await connection.connect();
    app.use(fileUpload({
      createParentPath: true,
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }));

    app.route('/cars')
        .get(CarController.get)
        .post(Validator.validateUploadRequest, CarController.post)

    return app;
  },
  closeDB: async () => {
    return connection.closeDatabase();
  }
}


module.exports = App;