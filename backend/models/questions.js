const mongoose = require("mongoose");

require("dotenv").config();

const optionSchema = new mongoose.Schema({
  id: Number,
  label: String,
  text: String,
  isCorrect: Boolean,
});

const testcaseSchema = new mongoose.Schema({
  id: Number,
  input: String,
  expectedOutput: String,
});

const questionSchema = new mongoose.Schema({
  id: Number,
  img: String,
  type: String,
  subtype: String,
  text: String,
  options: [optionSchema],
  testcases: [testcaseSchema],
});

const Question = mongoose.model("Questions", questionSchema);

module.exports = Question;
