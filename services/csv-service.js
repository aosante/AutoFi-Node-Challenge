const csvParser = require('csv-parser');
const fs = require('fs');
const utils = require('../util/index');
const { uuid } = require('uuidv4');
const Csv = require('../models/Csv');
const COLUMNS = require('../util/columns');

const DEFAULT_COLUMNS = Object.values(COLUMNS);

const processRow = (row, columns) => {
  row.UUID = uuid();
  return {
    UUID: uuid(),
    ...utils.formatCsv(row, columns)
  };
};

const commitToDb = (data, resolve, reject) => {
  Csv.insertMany(data)
    .then(response => {
      console.log('Inserted data successfully');
      resolve(response);
    })
    .catch(err => {
      console.log('Could not save data', err);
      reject(err);
    });
};

const csvService = (providerName, filePath) => {
  const data = [];
  // choose the desired column layout based on providerName
  const providerColumns = utils.columnConfig[providerName];
  const columns = providerColumns ? providerColumns : DEFAULT_COLUMNS;

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .on('error', reject)
      .pipe(csvParser())
      .on('data', row => {
        const newRow = processRow(row, columns);
        data.push(newRow);
      })
      .on('end', () => {
        commitToDb(data, resolve, reject);
      });
  });
};

module.exports = { csvService, commitToDb, processRow };
