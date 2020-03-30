const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { processRow } = require('../csv-service');
const COLUMNS = require('../../util/columns');
const Csv = require('../../models/Csv');

const DEFAULT_COLUMNS = Object.values(COLUMNS);

it('should remove extra column', () => {
  const extraColumnInput = {
    VIN: '8725',
    Make: 'Audi',
    Model: 'A7',
    Mileage: '40000',
    Year: '2018',
    Price: '70k',
    'Zip Code': '33184',
    'Create Date': '11/11/2019',
    'Update Date': '11/11/2020',
    ExtraColumn: 'extra'
  };
  const newRow = processRow(extraColumnInput, DEFAULT_COLUMNS);
  expect(newRow).not.toHaveProperty('ExtraColumn');
});

it('should add mising column with a string as its value', () => {
  const missingColumnInput = {
    VIN: '8725',
    Make: 'Audi',
    Model: 'A7',
    Mileage: '40000',
    Year: '2018',
    Price: '70k',
    'Zip Code': '33184',
    'Create Date': '11/11/2019'
  };
  const newRow = processRow(missingColumnInput, DEFAULT_COLUMNS);
  expect(newRow['Update Date']).toEqual('not provided');
});

let mongoServer;
const mongooseOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, mongooseOpts, err => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

it('should successfully save object to mongo db collection', async () => {
  const testInput = [
    {
      VIN: '8725',
      Make: 'Audi',
      Model: 'A7',
      Mileage: '40000',
      Year: '2018',
      Price: '70k',
      'Zip Code': '33184',
      'Create Date': '11/11/2019',
      'Update Date': '11/11/2020'
    }
  ];
  const data = await Csv.insertMany(testInput);
  // if an _id property is generated, the data has been successfully inserted
  expect(data[0]).toHaveProperty('_id');
});
