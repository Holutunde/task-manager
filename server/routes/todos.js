const express = require('express')
const authentication = require('../../middleware/authentication')
const router = express.Router()

const {
  allTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo')

router.route('/').get(authentication, allTodos).post(authentication, createTodo)
router
  .route('/:id')
  .get(authentication, getTodo)
  .patch(authentication, updateTodo)
  .delete(authentication, deleteTodo)

module.exports = router
