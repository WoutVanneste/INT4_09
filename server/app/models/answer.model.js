const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema(
  {
    question: String,
    answers: [{}]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Answer", AnswerSchema);
