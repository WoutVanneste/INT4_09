import React, { Component } from "react";
import { observer, inject } from "mobx-react";
// import { socket } from "../containers/App.js";
import radioStyles from "../styles/radioButtons.module.css";
import buttonStyles from "../styles/buttons.module.css";
import styles from "./form.module.css";

// import jurkje from "../../public/assets/img/jurkje.svg";
// import trainingsoutfit from "../../public/assets/img/trainingsoutfit.svg";

class MeerKeuze extends Component {
  constructor(props) {
    super(props);
    this.state = { huidigAntwoord: "" };
  }

  handleSubmitForm = e => {
    e.preventDefault();

    // Het antwoord wordt uit de state gehaald.
    this.props.verstuurAntwoord({ antwoord: this.state.huidigAntwoord });
  };

  handleChangeRadio = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ huidigAntwoord: e.currentTarget.value });
  };

  checkImg = img => {
    // Hier wordt gecontroleerd of de svg die we ophalen bestaat
    // indien deze niet bestaat betekent dit dat het een jpg moet zijn.

    var http = new XMLHttpRequest();
    const path = `/assets/img/${img}.svg`;

    http.open("GET", path, false);
    http.send();

    if (http.status != 404) {
      return (
        <img
          className={radioStyles.svg}
          src={`/assets/img/${img}.svg`}
          alt={img}
        />
      );
    } else {
      return (
        <img
          className={radioStyles.jpg}
          src={`/assets/img/${img}.jpg`}
          alt={img}
        />
      );
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitForm} className={styles.player_form}>
        <div className={styles.player_input_wrapper}>
          {this.props.question.options.length > 0 ? (
            this.props.question.options.map((question, index) => (
              <label
                htmlFor={index}
                className={radioStyles.radio_label}
                key={index}
              >
                <input
                  id={index}
                  type="radio"
                  name="keuze"
                  value={question}
                  checked={this.state.huidigAntwoord === question}
                  onChange={this.handleChangeRadio}
                  className={radioStyles.radio_input}
                />
                <img
                  className={radioStyles.svg}
                  src={`/assets/img/${question}.svg`}
                  alt={question}
                />
              </label>
            ))
          ) : (
            <p>Antwoorden aan het ophalen...</p>
          )}
        </div>
        <input
          className={
            styles.player_submit +
            " " +
            (this.state.huidigAntwoord === ""
              ? buttonStyles.submit_form_empty
              : buttonStyles.submit_form)
          }
          type="submit"
          value="Antwoorden"
          disabled={this.state.huidigAntwoord === "" ? true : false}
        />
      </form>
    );
  }
}

export default inject(`answerStore`)(observer(MeerKeuze));
