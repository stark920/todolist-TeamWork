const {HEADERS} = require('../utils/constant')

/** 成功
 * @param res requestListener 的 res
 * @param todos requestListener 資訊
 */
function successHandle(res, todos) {
  res.writeHead(200, HEADERS)
  res.write(
    JSON.stringify({
      status: 'success',
      todos,
    })
  )
  res.end()
}

module.exports = successHandle
