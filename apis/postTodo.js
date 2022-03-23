const {v4: uuidv4} = require('uuid')
const {successHandle, errorHandle} = require('../handler/index')

/** 新增單筆代辦*/
const postTodo = (req, res, body, todos) => {
  try {
    const title = JSON.parse(body).title
    if (title !== undefined) {
      const todo = {
        title: title,
        id: uuidv4(),
      }
      todos.push(todo)
      successHandle(res, todos)
    } else {
      errorHandle(res, 'title 未正確填寫')
    }
  } catch (error) {
    // 非JSON格式
    errorHandle(res, 'JSON 格式錯誤')
  }
}
module.exports = postTodo
