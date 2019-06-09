import uuid from "uuid";
import { decorate, observable, action, computed } from "mobx";

class Answer {
  constructor(question, answer, id = uuid.v4()) {
    this.id = id;
    this.question = question;
    this.answer = answer;
  }

  setId = value => (this.id = value);
  setQuestion = value => (this.question = value);
  setAnswer = value => (this.answer = value);

  updateFromServer = values => {
    this.setId(values._id);
    this.setQuestion(values.question);
    this.setAnswer(values.answer);
  };
}

decorate(Answer, {
  id: observable,
  question: observable,
  answer: observable,
  setId: action,
  setQuestion: action,
  setAnswer: action
});

export default Answer;
