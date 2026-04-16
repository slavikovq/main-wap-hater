const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  grade: { type: Number, required: true },
  requiredHours: { type: Number, required: true },
});

module.exports = mongoose.model("Subject", schema);