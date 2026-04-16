const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  average: { type: Number, required: true },
  grade: {type: mongoose.Schema.Types.ObjectId, ref: "Class"}
});

module.exports = mongoose.model("Student", schema);