function generateHeader(request) {
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': request.method,
    'Content-Type': 'application/json',
  }

  return headers
}

module.exports = generateHeader
