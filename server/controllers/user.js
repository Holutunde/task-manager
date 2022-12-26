const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const { generateTokens } = require('../../utils/generateToken')

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email })

  if (name && email && password) {
    const hash = await bcrypt.hash(password, 5)
    const newUser = new User({
      name: name,
      email: email,
      password: hash,
    })

    const createdUser = await newUser.save()

    return res.status(200).json({
      createdUser,
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json('provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json('user not registered')
  }
  const isPasswordEqual = await bcrypt.compare(password, user.password)

  if (!isPasswordEqual) {
    return res.status(401).json('password does not match')
  }
  const { accessToken, refreshToken } = await generateTokens(user)

  return res.status(201).json({
    token: accessToken,
    refreshToken: refreshToken,
    name: user.name,
    userId: user._id.toString(),
  })
}
