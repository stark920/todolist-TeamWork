const generateHeader = require('../header/index')

function errorHandler(req, res, status) {
  const data = {
    status: 'error',
    message: '欄位未填寫正確，或無此 todo ID',
  }

  res.writeHead(status, generateHeader(req))
  res.write(JSON.stringify(data))
  res.end()
}

module.exports = errorHandler
