const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  contract: { type: Number, required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject"}]
});

module.exports = mongoose.model("Teacher", schema);