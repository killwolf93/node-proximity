const csv = require('csv-parser')
const fs = require('fs')
const CONFIG = require('../../config/config');

const FileParser = {
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
  extractDataFromCsvRow: (row, objectMap) => {
    let data = {};
    Object.keys(objectMap).forEach(paramName => {
      data[paramName] = row[objectMap[paramName]]
    })
    return data;
  }
}

module.exports = FileParser;