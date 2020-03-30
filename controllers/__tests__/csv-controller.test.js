const csvController = require('../csv-controller');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

it('should reject promise if no file is provided', () => {
  const requestWithNoFile = {
    file: {},
    body: {
      providerName: 'name'
    }
  };
  const res = mockResponse();
  csvController(jest.fn())(requestWithNoFile, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    msg: 'Make sure you are providing a csv file'
  });
});

it('should reject promise if no name is provided', () => {
  const requestWithNoName = {
    file: { filePath: 'path' },
    body: {
      providerName: null
    }
  };
  const res = mockResponse();
  csvController(jest.fn())(requestWithNoName, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    msg: 'Make sure you are providing the provider name'
  });
});
