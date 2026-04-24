const mongoose = require("mongoose");

const schema = mongoose.Schema({
  grade: { type: Number, required: true },
  code: { type: String, required: true },
  main: { type: Boolean, required: true },
  mainCode: { type: String, required: false },
});

module.exports = mongoose.model("Class", schema);