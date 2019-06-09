import QuestionStore from "./QuestionStore";

class Store {
  constructor() {
    this.questionStore = new QuestionStore(this);
  }
}

export default new Store();
