const User = require('../model/userSchema')
const bcrypt = require('bcryptjs')

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

    return res.json({
      createdUser,
    })
  }
}
