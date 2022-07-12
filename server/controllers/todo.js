const Todo = require('../model/todoSchema')
const asyncWrap = require('../../middleware/async')
const { createCustomError } = require('../../error/customError')

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

const getTodo = asyncWrap(async (req, res, next) => {
  const { id } = req.params
  const todo = await Todo.findById(id)
  if (todo == null) {
    return next(createCustomError(`Task with id : ${id} not found`, 404))
  }
  return res.json({
    successful: true,
    message: todo,
  })
})

const allTodos = asyncWrap(async (req, res, next) => {
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
    return next(createCustomError(`Task with id : ${id} not found`, 404))
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
    return next(createCustomError(`Task with id : ${id} not found`, 404))
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
