// import uuid from "uuid";
import { decorate, observable, action, computed } from "mobx";

class Answer {
  //constructor(question, answer, id = uuid.v4()) {
  constructor(question, answers) {
    this.question = question;
    //this.answers = [{ id: (this.id = id), answer: (this.answer = answer) }];
    this.answers = answers;
  }

  // setId = value => (this.id = value);
  setQuestion = value => {
    console.log(`question set values`, value);
    this.question = value;
    console.log(`this.question`, this.question);
  };
  // setAnswer = value => (this.answer = value);
  setAnswers = value => (this.answers = value);

  updateFromServer = values => {
    console.log(`values in updatefromserver`, values);
    this.setQuestion(values.question);
    this.setAnswers(values.answers);
  };

  get values() {
    return { question: this.question, answers: this.answers };
  }
}

decorate(Answer, {
  question: observable,
  answers: observable,
  setQuestion: action,
  setAnswers: action,
  values: computed
});

export default Answer;
