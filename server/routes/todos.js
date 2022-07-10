const express = require('express')
const router = express.Router()

const {
  allTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo')

router.route('/').get(allTodos).post(createTodo)
router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo)

module.exports = router
