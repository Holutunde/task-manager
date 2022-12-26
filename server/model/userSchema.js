const mongoose = require('mongoose')
const Profile = require('./profileSchema')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
})

UserSchema.pre('save', async function (next) {
  try {
    // Check if new user has existing profile
    const existingProfile = await Profile.findOne({ user: this._id })

    // Don't create new profile if one already exists
    if (existingProfile) return next()

    // Create new profile if user has no profile
    await Profile.create({
      email: this.email,
      user: this._id,
      name: this.name,
    })

    next()
  } catch (error) {
    // Prevent new user from being created if profile fails to create
    next(error)
  }
})

module.exports = mongoose.model('User', UserSchema)
