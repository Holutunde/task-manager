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

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (todo == null) {
      return res.status(404).json({ successful: false, message: 'Not found' })
    }
    return res.json({
      successful: true,
      message: todo,
    })
  } catch (error) {
    return res.status(500).json({ successful: false, message: error.message })
  }
}

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
