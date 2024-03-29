const Todo = require('../model/todoSchema')
const asyncWrap = require('../../middleware/async')
const { createCustomError } = require('../../error/customError')

const createTodo = asyncWrap(async (req, res) => {
  const { name, completed } = req.body
  const user_id = req.user._id
  const newTodo = new Todo({
    name,
    completed,
    userId: user_id,
  })
  await newTodo.save()
  return res.status(200).json({
    successful: true,
    message: newTodo,
  })
})

const getTodo = asyncWrap(async (req, res, next) => {
  const { id } = req.params
  const user_id = req.user._id
  const todo = await TodofindOne({ _id: id, userId: user_id })
  if (todo == null) {
    return next(createCustomError(`Task with id : ${id} not found`, 404))
  }
  return res.json({
    successful: true,
    message: todo,
  })
})

const allTodos = asyncWrap(async (req, res, next) => {
  const user_id = req.user._id
  console.log(user_id)
  Todo.find({ userId: user_id }, function (err, allTodos) {
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
  const user_id = req.user._id

  const newUpdate = await Todo.findOneAndUpdate(
    { _id: id, userId: user_id },
    changeTodo,
    options,
  )

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
  const user_id = req.user._id
  const removeTodo = await Todo.findOneAndDelete({ _id: id, userId: user_id })
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
