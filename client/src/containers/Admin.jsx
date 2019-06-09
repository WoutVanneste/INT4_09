import React, { Component } from "react";
import Menu from "../components/Menu";
import styles from "./Admin.module.css";
import radioStyles from "../styles/radioButtons.module.css";
import buttonStyles from "../styles/buttons.module.css";
import { socket } from "./App.js";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: "" };
  }
  handleSubmitForm = e => {
    //hier wordt de gebruiker doorgestuurd naar de player pagina, we geven ook het aantal opties mee voor de vraag.
    //'vraag' is de data die we meegeven om in de player container uit te lezen.

    e.preventDefault();
    console.log(this.state.selectedOption);
    socket.emit("question", this.state.selectedOption); // emit de value van de input.
    socket.emit("clear", true);
  };

  handleChangeOption = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ selectedOption: e.currentTarget.value });
  };

  handleClickButton = e => {
    //spelers krijgen een wachtscherm te zien.
    e.preventDefault();
    this.setState({ selectedOption: "wachtscherm" });
    console.log(this.state);
    socket.emit("question", "wachtscherm");
  };

  componentDidMount() {
    socket.on("question", type => {
      // vang een socket emit op.
      console.log(`socket message`, type);
    });
  }

  render() {
    return (
      <>
        <Menu />
        <p className="title">Admin container</p>
        <p className={styles.admin_keuze}>
          Kies welk soort vraag moeten de spelers krijgen?
        </p>
        <form
          action=""
          onSubmit={this.handleSubmitForm}
          className={styles.admin_form}
        >
          <div className={styles.admin_input_wrapper}>
            <label htmlFor="sliderInput" className={radioStyles.radio_label}>
              <input
                id="sliderInput"
                type="radio"
                name="keuze"
                value="slider"
                checked={this.state.selectedOption === "slider"}
                onChange={this.handleChangeOption}
                required
                className={radioStyles.radio_input}
              />
              <span className={radioStyles.radio_span}>slider</span>
            </label>
            <label htmlFor="tekstInput" className={radioStyles.radio_label}>
              <input
                id="tekstInput"
                type="radio"
                name="keuze"
                value="tekst"
                checked={this.state.selectedOption === "tekst"}
                onChange={this.handleChangeOption}
                required
                className={radioStyles.radio_input}
              />
              <span className={radioStyles.radio_span}>tekst</span>
            </label>
            <label htmlFor="2keuzes" className={radioStyles.radio_label}>
              <input
                id="2keuzes"
                type="radio"
                name="keuze"
                value="2"
                checked={this.state.selectedOption === "2"}
                onChange={this.handleChangeOption}
                required
                className={radioStyles.radio_input}
              />
              <span className={radioStyles.radio_span}>2 opties</span>
            </label>
            <label htmlFor="4keuzes" className={radioStyles.radio_label}>
              <input
                id="4keuzes"
                type="radio"
                name="keuze"
                value="4"
                checked={this.state.selectedOption === "4"}
                onChange={this.handleChangeOption}
                required
                className={radioStyles.radio_input}
              />
              <span className={radioStyles.radio_span}>4 opties</span>
            </label>
            <label htmlFor="8keuzes" className={radioStyles.radio_label}>
              <input
                id="8keuzes"
                type="radio"
                name="keuze"
                value="8"
                checked={this.state.selectedOption === "8"}
                onChange={this.handleChangeOption}
                required
                className={radioStyles.radio_input}
              />
              <span className={radioStyles.radio_span}>8 opties</span>
            </label>
          </div>
          <input
            className={
              styles.admin_submit +
              " " +
              (this.state.selectedOption === ""
                ? buttonStyles.submit_form_empty
                : buttonStyles.submit_form)
            }
            type="submit"
            value="Verstuur vraag"
            disabled={this.state.selectedOption === "" ? true : false}
          />
        </form>
        <div className={styles.wachtscherm_wrapper}>
          <p className={styles.wachtscherm_tekst}>
            Laat de spelers maar weer wachten
          </p>
          <button
            className={buttonStyles.submit_form}
            onClick={this.handleClickButton}
          >
            Wachtscherm
          </button>
        </div>
      </>
    );
  }
}

export default Admin;
