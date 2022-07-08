const Todo = require('../model/todoSchema')

const createTodo = async (req, res) => {
  const { name, completed } = req.body
  const newTodo = new Todo({
    name,
    completed,
  })

  try {
    await newTodo.save()
    return res.status(200).json({
      successful: true,
      message: newTodo,
    })
  } catch (error) {
    return res.status(400).json({ successful: false, message: error.message })
  }
}

const getTodo = async (req, res) => {}

const allTodos = (req, res) => {}

const updateTodo = async (req, res) => {}
const deleteTodo = async (req, res) => {}

module.exports = {
  allTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
}
