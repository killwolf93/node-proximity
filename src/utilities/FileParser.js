const csv = require('csv-parser')
const fs = require('fs')
const CONFIG = require('../../config/config');

const FileParser = {
  /**
   * This will get uploaded file and will move it to a local folder
   * @param  {json} options [json object that contains file,provider and providerMap]
   * @return {Promise}      [Promise that will resolve in object containing {fileName, provider, providerMap}]
   */
  moveFile: ({file, provider, providerMap}) => {
    const fileName = `${CONFIG.TEMP_FILE_PATH}${Date.parse(new Date())}-${provider}.csv`
    return new Promise((resolve, reject) => {
      file.mv(fileName, err => {
        if (err) {
          reject(err)
        }
        resolve({fileName, provider, providerMap});
      })
    });
  },
  /**
   * This will read the file located in the server and process the rows to map the data needed
   * @param  {json} options [json object that contains fileName and providerMap]
   * @return {Promise}      [Promise that will resolve with the extracted info of the cars]
   */
  parse: ({fileName, providerMap}) => {
    return new Promise((resolve, reject) => {
      let cars = []
      fs.createReadStream(fileName, providerMap)
          .pipe(csv())
          .on('data', data => cars.push(FileParser.extractDataFromCsvRow(data, providerMap)))
          .on('end', () => resolve(cars))
          .on('error', error => reject(error));
    })
  },
  /**
   * This will extract data from a row of the csv file and create a car data based on the objectMap
   * @param  {json} row [row from the csv file]
   * @param  {json} objectMap [mapObject that defines the column layout]
   * @return {json}      [Json object with the extracted data]
   */
  extractDataFromCsvRow: (row, objectMap) => {
    let data = {};
    Object.keys(objectMap).forEach(paramName => {
      data[paramName] = row[objectMap[paramName]]
    })
    return data;
  }
}

module.exports = FileParser;