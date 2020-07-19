const CarController = require('./controllers/CarController')
const Validator = require('./middleware/validator')
const express = require('express')
const fileUpload = require('express-fileupload');
const app = express()

app.use(fileUpload({
  createParentPath: true,
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.route('/upload')
    .post(Validator.validateUploadRequest, CarController.upload)


module.exports = app;