const csvController = service => async (req, res) => {
  const {
    file = {},
    body: { providerName = null }
  } = req;
  const { path: filePath = null } = file;

  if (isFileMissing(file)) {
    return res
      .status(400)
      .json({ msg: 'Make sure you are providing a csv file' });
  }

  if (isNameMissing(providerName)) {
    return res
      .status(400)
      .json({ msg: 'Make sure you are providing the provider name' });
  }

  try {
    const data = await service.csvService(providerName, filePath);
    res.send({ data, msg: 'Data successfully saved' });
  } catch (err) {
    res.status(400).json({
      msg: "There's been a problem processing and saving the provided file"
    });
  }
};

const isFileMissing = file => Object.keys(file).length === 0;
const isNameMissing = name => name === null;

module.exports = csvController;
