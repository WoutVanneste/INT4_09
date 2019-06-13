const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  question: String,
  type: {},
  options: [{}]
});

module.exports = mongoose.model("Question", QuestionSchema, "questions");
