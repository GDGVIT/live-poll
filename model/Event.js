const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Code: {
    type: String,
    required: true
  },
  Actions: {
    type: Array,
    default: []
  },
  Participants: {
    type: Number,
    default: 0
  },
  Date: {
    type: Date,
    Default: new Date()
  }
})

module.exports = mongoose.model('Event', eventSchema)
