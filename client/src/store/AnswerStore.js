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
    console.log(`data`, data);
    const answer = new Answer();
    answer.updateFromServer(data);
    console.log(`answer`, answer);
    this.api
      .create(answer)
      .then(console.log(`apiAnswer`, answer))
      .then(answerValues => answer.updateFromServer(answerValues));

    //this.api.create(data);
    // this.api
    //   .create(answer)
    //   .then(answerValues => answer.updateFromServer(answerValues));
  };
}

decorate(AnswerStore, {
  answers: observable,
  addAnswerToDatabase: action
});

export default AnswerStore;
