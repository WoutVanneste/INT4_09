import { decorate, observable, configure, action } from "mobx";
import Api from "../api";

configure({ enforceActions: `observed` });
class QuestionStore {
  questions = [];
  taal = "";

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = new Api(`questions`);
    this.getAll();
  }

  setLanguage = taal => {
    this.taal = taal;
  };

  getAll = () => {
    this.api.getAll().then(d => d.forEach(this.addQuestionsToArray));
  };

  addQuestionsToArray = data => {
    this.questions.push(data);
  };
}

decorate(QuestionStore, {
  questions: observable,
  addQuestionsToArray: action
});

export default QuestionStore;
