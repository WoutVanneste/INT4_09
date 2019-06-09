import React, { Component } from "react";
import { socket } from "../containers/App.js";
import buttonStyles from "../styles/buttons.module.css";
import styles from "./form.module.css";

class SliderInput extends Component {
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

  handleChangeSlider = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ huidigAntwoord: e.currentTarget.value });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmitForm} className={styles.player_form}>
        <input
          type="range"
          min="0"
          max="100"
          onChange={this.handleChangeSlider}
          value={this.state.huidigAntwoord}
        />
        <input
          type="submit"
          value="Antwoorden"
          className={
            styles.player_submit +
            " " +
            (this.state.huidigAntwoord === ""
              ? buttonStyles.submit_form_empty
              : buttonStyles.submit_form)
          }
        />
      </form>
    );
  }
}

export default SliderInput;
