const Question = require("../models/question.model.js");

exports.create = (req, res) => {
  if (!req.body.question) {
    return res.status(500).send({ err: "question can not be empty" });
  }

  const question = new Question({
    question: req.body.question,
    type: req.body.type,
    options: req.body.options
  });

  question
    .save()
    .then(question => res.send(question))
    .catch(err => {
      res.status(500).send({ error: err.question || "Error" });
    });
};

exports.findAll = async (req, res) => {
  try {
    const questions = await Question.find();
    res.send(questions);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.question || "Error" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const question = await Question.findOne({
      _id: req.params.questionId
    });
    if (question) {
      res.send(question);
    } else {
      res.status(404).send("No question found");
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(500).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.question) {
    return res.status(400).send("question mag niet leeg zijn");
  }

  try {
    const question = await Question.findOneAndUpdate(
      {
        _id: req.params.questionId
      },
      {
        question: req.body.question,
        type: req.body.type,
        options: req.body.options
      },
      {
        new: true
      }
    );

    if (!question) {
      return res.status(404).send("No question found");
    }
    res.send(question);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(417).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const question = await Question.findOneAndRemove({
      _id: req.params.questionId
    });
    if (!question) {
      return res.status(404).send("No question found");
    }
    res.send(question);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(417).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};
