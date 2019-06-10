import { decorate, observable, configure, action, runInAction } from "mobx";
// import Drink from "../models/Drink";
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
    console.log("taal is veranderd naar: ", this.taal);
  };

  getAll = () => {
    this.api.getAll().then(d => d.forEach(this.addQuestionsToArray));
  };

  addQuestionsToArray = data => {
    this.questions.push(data);
    //console.log(`functie werkt`);
    //console.log(data);
    console.log(this.questions);
  };

  // addDrink = data => {
  //   const newDrink = new Drink();
  //   newDrink.updateFromServer(data);
  //   this.drinks.push(newDrink);
  //   this.api
  //     .create(newDrink)
  //     .then(drinkValues => newDrink.updateFromServer(drinkValues));
  // };

  // _addDrink = values => {
  //   console.log(values);
  //   const drink = new Drink();
  //   drink.updateFromServer(values);
  //   runInAction(() => this.drinks.push(drink));
  // };

  // updateDrink = drink => {
  //   this.api
  //     .update(drink)
  //     .then(drinkValues => drink.updateFromServer(drinkValues));
  // };

  // deleteDrink = drink => {
  //   this.drinks.remove(drink);
  //   this.api.delete(drink);
  // };
}

decorate(QuestionStore, {
  questions: observable,
  addQuestionsToArray: action
});

export default QuestionStore;
