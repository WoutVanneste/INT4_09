import QuestionStore from "./QuestionStore";
import AnswerStore from "./AnswerStore";

class Store {
  constructor() {
    this.questionStore = new QuestionStore(this);
    this.answerStore = new AnswerStore(this);
  }
}

export default new Store();
