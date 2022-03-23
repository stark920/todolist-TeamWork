const {v4: uuidv4} = require('uuid')
const {HEADERS} = require('../utils/constant')
const {getTodo, postTodo, deleteTodo, patchTodo} = require('../apis/index')
const routeWrapper = require('./common/routeWrapper')

const routePath = 'todos'
const todos = [
  {
    title: '刷牙唷!',
    id: uuidv4(),
  },
]

const todosRoute = (req, res) => {
  // http 傳來的 body 資訊
  let body = ''
  // 當 req 收到片段的 chunk 時，將資料加入 body 內
  req.on('data', dataChunks => {
    body += dataChunks
  })

  const METHOD = req.method
  switch (METHOD) {
    case 'GET':
      getTodo(res, todos)
      break
    case 'POST':
      // 當 req 收完資料時，執行新增單筆代辦的功能
      req.on('end', () => {
        postTodo(req, res, body, todos)
      })
      break
    case 'DELETE':
      deleteTodo(req, res, todos)
      break
    case 'PATCH':
      // 當 req 收完資料時，執行編輯單筆代辦的功能
      req.on('end', () => {
        patchTodo(req, res, body, todos)
      })
      break
    case 'OPTIONS':
      res.writeHead(200, HEADERS)
      res.end()
      break
    default:
      break
  }
}

module.exports = routeWrapper(routePath, todosRoute)
