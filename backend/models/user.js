const mongoose = require("mongoose");

require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  max_apti_marks: {
    type: Number,
    default: 0,
  },
  max_logi_marks: {
    type: Number,
    default: 0,
  },
  max_techni_marks: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
  },
  testsTaken: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
