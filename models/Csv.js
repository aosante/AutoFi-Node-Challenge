const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generateObjectId = (
  m = Math,
  d = Date,
  h = 16,
  s = s => m.floor(s).toString(h)
) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));

const CsvSchema = new Schema({
  // would reference the provider document to which the csv belongs to
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'providers',
    default: generateObjectId()
  },
  UUID: {
    type: String
  },
  VIN: {
    type: String,
    default: 'not provided'
  },
  Make: {
    type: String,
    default: 'not provided'
  },
  Model: {
    type: String,
    default: 'not provided'
  },
  Mileage: {
    type: String,
    default: 'not provided'
  },
  Year: {
    type: String,
    default: 'not provided'
  },
  Price: {
    type: String,
    default: 'not provided'
  },
  'Zip Code': {
    type: String,
    default: 'not provided'
  },
  'Create Date': {
    type: String,
    default: 'not provided'
  },
  'Update Date': {
    type: String,
    default: 'not provided'
  }
});

module.exports = Csv = mongoose.model('csv', CsvSchema);
