const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const PORT = process.env.PORT || 4000;

const mongod = new MongoMemoryServer();

mongoose.Promise = Promise;
mongod.getUri().then(mongoUri => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  mongoose.connect(mongoUri, mongooseOpts);

  mongoose.connection.on('error', err => {
    if (err.message.code === 'ETIMEDOUT') {
      console.log(err);
      mongoose.connect(mongoUri, mongooseOpts);
    }
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

const csvRouter = require('./routes/csv-route');

app.use('/api', csvRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
