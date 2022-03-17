const http = require('http')
const {v4: uuidv4} = require('uuid')
const errorHandler = require('./errorHandler/index')
const generateHeader = require('./header/index')
const todos = [
  {
    title: '刷牙唷!',
    id: uuidv4(),
  },
]

const requestListener = (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })

  if (req.url == '/todos' && req.method == 'GET') {
    try {
      res.writeHead(200, generateHeader(req))
      res.write(
        JSON.stringify({
          status: 'success',
          data: todos,
        })
      )
      res.end()
    } catch (error) {
      errorHandler(req, res, 400)
    }
  } else if (req.url == '/todos' && req.method == 'POST') {
    req.on('end', function () {
      try {
        const title = JSON.parse(body).title
        if (title !== undefined) {
          todos.push({
            title,
            id: uuidv4(),
          })
          res.writeHead(200, generateHeader(req))
          res.write(
            JSON.stringify({
              status: 'success',
              data: todos,
            })
          )
          res.end()
        } else {
          errorHandler(req, res, 400)
        }
      } catch (error) {
        errorHandler(req, res, 400)
      }
    })
  } else if (req.url == '/todos' && req.method == 'DELETE') {
    const splitUrl = req.url.split('/').filter(e => e)
    const isDeleteAll = splitUrl.length === 1

    if (isDeleteAll) {
      // delete all
      todos.length = 0
    } else {
      // delete specific id
      const index = todos.findIndex(e => e.id === splitUrl[1])
      if (index !== -1) {
        todos.splice(index, 1)
      } else {
        errorHandler(req, res, 400)
        return
      }
    }

    res.writeHead(200, generateHeader(req))
    res.write(
      JSON.stringify({
        status: 'success',
        data: todos,
      })
    )
    res.end()
  } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
    req.on('end', function () {
      try {
        const splitUrl = req.url.split('/').filter(e => e)
        const title = JSON.parse(body).title
        const index = todos.findIndex(e => e.id === splitUrl[1])

        if (title && index !== -1) {
          todos[index].title = title
        } else {
          errorHandler(req, res, 400)
          return
        }

        res.writeHead(200, generateHeader(req))
        res.write(
          JSON.stringify({
            status: 'success',
            data: todos,
          })
        )
        res.end()
      } catch (error) {
        errorHandler(req, res, 400)
      }
    })
  } else if (req.method == 'OPTIONS') {
    res.writeHead(200, headers)
    res.end()
  } else {
    res.writeHead(404, headers)
    res.write(
      JSON.stringify({
        status: 'false',
        message: '無此網站路由',
      })
    )
    res.end()
  }
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3005)
