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
    return res.status(500).json({ successful: false, message: error.message })
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

const allTodos = async (req, res) => {
  try {
    Todo.find({}, '', function (err, allTodos) {
      return res.json({
        successful: true,
        message: allTodos,
      })
    })
  } catch (error) {
    return res.status(500).json({ successful: false, message: error.message })
  }
}

const updateTodo = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ successful: false, message: error.message })
  }
}
const deleteTodo = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ successful: false, message: error.message })
  }
}

module.exports = {
  allTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
}
