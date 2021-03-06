const mongoose = require('mongoose')

const opt = new mongoose.Schema({
  option: {
    type: String,
    required: true
  },
  stat: {
    type: Number,
    default: 0
  }
})
const Question = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  options: {
    type: [opt],
    default: []
  },
  correct: {
    type: String,
    required: false
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})
const actionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: new Date().getTime()
  },
  action_type: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  Questions: {
    type: [Question],
    default: []
  }
})

module.exports = mongoose.model('Action', actionSchema)
