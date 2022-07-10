const Todo = require('../model/todoSchema')
const asyncWrap = require('../../middleware/async')

const createTodo = asyncWrap(async (req, res) => {
  const { name, completed } = req.body
  const newTodo = new Todo({
    name,
    completed,
  })
  await newTodo.save()
  return res.status(200).json({
    successful: true,
    message: newTodo,
  })
})

const getTodo = asyncWrap(async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (todo == null) {
    return res.status(404).json({ successful: false, message: 'Not found' })
  }
  return res.json({
    successful: true,
    message: todo,
  })
})

const allTodos = asyncWrap(async (req, res) => {
  Todo.find({}, '', function (err, allTodos) {
    return res.json({
      successful: true,
      message: allTodos,
    })
  })
})

const updateTodo = asyncWrap(async (req, res) => {
  const id = req.params.id
  const changeTodo = req.body
  const options = { new: true }

  const newUpdate = await Todo.findByIdAndUpdate(id, changeTodo, options)

  if (newUpdate == null) {
    return res
      .status(404)
      .json({ successful: false, message: 'Todo not found' })
  }

  return res.json({
    successful: true,
    message: newUpdate,
  })
})
const deleteTodo = asyncWrap(async (req, res) => {
  const id = req.params.id
  const removeTodo = await Todo.findOneAndDelete(id)
  if (!removeTodo) {
    return res
      .status(404)
      .json({ successful: false, message: `No Todo with ${id}` })
  }
  return res.json({
    successful: true,
    message: removeTodo,
  })
})

module.exports = {
  allTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
}
