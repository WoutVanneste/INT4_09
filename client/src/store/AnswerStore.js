import { decorate, observable, configure, action, runInAction } from "mobx";
import Answer from "../models/Answer";
import Api from "../api";

configure({ enforceActions: `observed` });
class AnswerStore {
  answers = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`answers`);
  }

  addAnswerToDatabase = data => {
    console.log(data);
    const newAnswer = new Answer(this.rootStore);
    newAnswer.updateFromServer(data);
    console.log(`answer addanswer`, newAnswer);

    this.api
      .create(newAnswer)
      .then(console.log(`apiAnswer`, newAnswer))
      .then(answerValues => newAnswer.updateFromServer(answerValues));
  };
}

decorate(AnswerStore, {
  answers: observable,
  addAnswerToDatabase: action
});

export default AnswerStore;
