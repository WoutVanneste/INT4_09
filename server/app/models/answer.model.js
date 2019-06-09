const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  question: String,
  answers: [{}]
});

module.exports = mongoose.model("Answer", AnswerSchema);
