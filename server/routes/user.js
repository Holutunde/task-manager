const express = require('express')
const { registerUser, login, logout } = require('../controllers/user')
const router = express.Router()

router.route('/create').post(registerUser)
router.route('/login').post(login)
router.route('/logout').post(logout)

module.exports = router
