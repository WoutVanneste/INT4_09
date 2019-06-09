const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  question: String,
  answers: [{ id: Number, answer: {} }]
});

module.exports = mongoose.model("Answer", AnswerSchema);
