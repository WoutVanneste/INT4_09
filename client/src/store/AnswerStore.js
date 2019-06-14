import { decorate, observable, configure, action } from "mobx";
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
    const newAnswer = new Answer(this.rootStore);
    newAnswer.updateFromServer(data);

    this.api
      .create(newAnswer)
      .then(answerValues => newAnswer.updateFromServer(answerValues));
  };
}

decorate(AnswerStore, {
  answers: observable,
  addAnswerToDatabase: action
});

export default AnswerStore;
