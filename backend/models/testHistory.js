const mongoose = require("mongoose");

require("dotenv").config();

const testHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  aptitude_marks: {
    type: Number,
    required: true,
  },
  logical_marks: {
    type: Number,
    required: true,
  },
  technical_marks: {
    type: Number,
    required: true,
  },
  test_date: {
    type: Date,
    default: Date.now,
  },
});

const testHistory = mongoose.model("Test History", testHistorySchema);

module.exports = testHistory;
