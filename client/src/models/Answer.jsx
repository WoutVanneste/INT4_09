import uuid from "uuid";
import { decorate, observable, action, computed } from "mobx";

class Answer {
  //constructor(question, answer, id = uuid.v4()) {
  constructor(question, answers) {
    this.question = question;
    //this.answers = [{ id: (this.id = id), answer: (this.answer = answer) }];
    this.answers = answers;
    //this.answer = answer;
    // console.log(`question in model`, question);
    // console.log(`answer in model`, answer);
    // console.log(`id in model`, id);
  }

  // setId = value => (this.id = value);
  setQuestion = value => {
    console.log(`question set values`, value);
    this.question = value;
    console.log(`this.question`, this.question);
  };
  // setAnswer = value => (this.answer = value);
  setAnswers = value => (this.answers = value);

  // updateFromServer = values => {
  //   this.setId(values._id);
  //   this.setQuestion(values.question);
  //   this.setAnswer(values.answer);
  // };

  updateFromServer = values => {
    console.log(`values in updatefromserver`, values);
    this.setQuestion(values.question);
    this.setAnswers(values.answers);
  };
}

decorate(Answer, {
  id: observable,
  question: observable,
  answer: observable,
  setId: action,
  setQuestion: action,
  setAnswer: action,
  setAnswers: action
});

export default Answer;
