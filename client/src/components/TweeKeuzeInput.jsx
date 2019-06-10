import React, { Component } from "react";
import { observer } from "mobx-react";
import { socket } from "../containers/App.js";
import radioStyles from "../styles/radioButtons.module.css";
import buttonStyles from "../styles/buttons.module.css";
import styles from "./form.module.css";

class TweeKeuzeInput extends Component {
  constructor(props) {
    super(props);
    this.state = { huidigAntwoord: "" };
  }

  handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    socket.emit("answer", this.state.huidigAntwoord); // emit de value van de input.
    e.preventDefault();
    this.props.verstuurAntwoord();
  };

  handleChangeRadio = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ huidigAntwoord: e.currentTarget.value });
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
                <span className={radioStyles.radio_span}>{question}</span>
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

export default observer(TweeKeuzeInput);
