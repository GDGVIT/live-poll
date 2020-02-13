//jshint esversion: 6
const mongoose = require("mongoose");

const opt = new mongoose.Schema({
  option: {
    type: Number,
    required: true
  },
  stat: {
    type: Number,
    required: true
  }
});
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
    type: Number,
    required: false
  }
});
const actionSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true,
    default: new Date().getTime()
  },
  type: {
    type: { type: String },
    required: true
  },
  Questions: {
    type: [Question],
    default: []
  }
});

module.exports = mongoose.model("Action", actionSchema);
