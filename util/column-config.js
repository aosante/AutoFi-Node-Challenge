const COLUMNS = require('./columns');
const columnConfig = {
  // excludes 'Update Date'
  'Dealer 1': [
    COLUMNS.uuid,
    COLUMNS.vin,
    COLUMNS.make,
    COLUMNS.model,
    COLUMNS.mileage,
    COLUMNS.year,
    COLUMNS.price,
    COLUMNS.zipCode,
    COLUMNS.createDate
  ],
  // excludes 'Update Date' and 'Create Date'
  'Dealer 2': [
    COLUMNS.uuid,
    COLUMNS.vin,
    COLUMNS.make,
    COLUMNS.model,
    COLUMNS.mileage,
    COLUMNS.year,
    COLUMNS.price,
    COLUMNS.zipCode
  ]
};

module.exports = columnConfig;
