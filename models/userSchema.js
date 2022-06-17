const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aadhar: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
