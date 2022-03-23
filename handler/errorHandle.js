const {HEADERS} = require('../utils/constant')

/** 失敗
 * @param res requestListener 的 res
 * @param message 錯誤訊息
 * *@param errorCode 狀態碼為 400
 */
function errorHandle(res, message, errorCode = 400) {
  res.writeHead(errorCode, HEADERS)
  res.write(
    JSON.stringify({
      status: 'false',
      message,
    })
  )
  res.end()
}

module.exports = errorHandle
