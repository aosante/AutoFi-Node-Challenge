const express = require('express');
const upload = require('multer')({ dest: 'temp/csv' });
const router = express.Router();
const controller = require('../controllers/index');

const services = require('../services/index');

router.post(
  '/upload-csv',
  upload.single('file'),
  controller.csvUpload(services)
);

module.exports = router;
