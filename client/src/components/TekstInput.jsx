import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { socket } from "../containers/App.js";
import buttonStyles from "../styles/buttons.module.css";
import styles from "./form.module.css";

class TekstInput extends Component {
  constructor(props) {
    super(props);
    this.state = { huidigAntwoord: "" };
  }

  handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    socket.emit("answer", this.huidigAntwoord); // emit de value van de input.
    e.preventDefault();
    this.props.verstuurAntwoord();
  };

  handleChangeTekst = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ huidigAntwoord: e.currentTarget.value });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmitForm} className={styles.player_form}>
        <input
          type="text"
          onChange={this.handleChangeTekst}
          value={this.huidigAntwoord}
        />
        <input
          type="submit"
          value="Antwoorden"
          className={
            styles.player_submit +
            " " +
            (this.huidigAntwoord === ""
              ? buttonStyles.submit_form_empty
              : buttonStyles.submit_form)
          }
        />
      </form>
    );
  }
}

export default withRouter(TekstInput);
