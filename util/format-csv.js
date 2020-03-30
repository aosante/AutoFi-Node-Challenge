const formatCsv = (row, columns) => {
  for (let prop in row) {
    if (!columns.includes(prop)) delete row[prop];
  }
  // replace missing columns with 'not provided'
  columns.forEach(col => {
    if (!Object.prototype.hasOwnProperty.call(row, col)) {
      row[col] = 'not provided';
    }
  });

  return row;
};

module.exports = formatCsv;
