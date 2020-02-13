//jshint esversion:6
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  Event: {
    type: String,
    required: true
  },
  Code: {
    type: Number,
    required: true
  },
  Actions: {
    type: Array,
    required: false
  }
});

module.exports = mongoose.model("Event", eventSchema);
