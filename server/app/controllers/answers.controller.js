const Answer = require("../models/answer.model.js");

exports.create = (req, res) => {
  // if (!req.body.answers) {
  //   return res.status(500).send({ err: "answer can not be emptyyyy" });
  // }

  const answer = new Answer({
    question: req.body.question,
    answers: req.body.answers
  });

  console.log(`answer in de controller`, req.body);

  answer
    .save()
    .then(answer => res.send(answer))
    .catch(err => {
      res.status(500).send({ error: err.answer || "Alles is kapot" });
    });
};

exports.findAll = async (req, res) => {
  try {
    const questions = await Answer.find();
    res.send(questions);
  } catch (err) {
    res.status(500).send({ err: err.answer || "Error" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const answer = await Answer.findOne({
      _id: req.params.answerId
    });
    if (answer) {
      res.send(answer);
    } else {
      res.status(404).send("No answer found");
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(500).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  if (!req.body.answer) {
    return res.status(400).send("answer mag niet leeg zijn");
  }

  try {
    const answer = await Answer.findOneAndUpdate(
      {
        _id: req.params.questionId
      },
      {
        question: req.body.question,
        answers: req.body.answers
      },
      {
        new: true
      }
    );

    if (!answer) {
      return res.status(404).send("No answer found");
    }
    res.send(answer);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(417).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const answer = await Answer.findOneAndRemove({
      _id: req.params.answerId
    });
    if (!answer) {
      return res.status(404).send("No answer found");
    }
    res.send(answer);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(417).send("Geen geldig ID");
    }
    return res.status(500).send(err);
  }
};
