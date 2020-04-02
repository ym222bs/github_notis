const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const saltRounds = 10

const urlmatch = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

const hookSchema = new mongoose.Schema({
  url: {
    type: String,
    match: urlmatch,
    required: true
  },
  webhook: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  git_id: {
    type: String,
    required: true
  },
  push: {
    type: Boolean,
    default: false
  },
  repo: {
    type: Boolean,
    default: false
  },
  issue: {
    type: Boolean,
    default: false
  },
  comment: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


const Hook = mongoose.model('hook_information', hookSchema)

module.exports = Hook