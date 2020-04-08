const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  git_id: {
    type: String,
    required: true,
    unique: true
  },
  avatar_url: {
    type: String
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
const User = mongoose.model('user_information', userSchema)

module.exports = User