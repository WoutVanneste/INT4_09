import React, { Component } from "react";
import Menu from "../components/Menu";
import styles from "./Admin.module.css";
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
    console.log(e);

    // this.props.history.push({
    //   pathname: "/player",
    //   vraag: this.state.selectedOption
    // });
    console.log(this.state.selectedOption);
    socket.emit("question", this.state.selectedOption); // emit de value van de input.
  };
  handleChangeOption = e => {
    //iedere keer en andere radio button wordt aangeklikt, wordt dit aangepast in de state.
    this.setState({ selectedOption: e.currentTarget.value });
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
        <p className={styles.title}>Admin container</p>
        <form action="" onSubmit={this.handleSubmitForm}>
          <input
            type="radio"
            name="naam"
            value="slider"
            checked={this.state.selectedOption === "slider"}
            onChange={this.handleChangeOption}
            required
          />{" "}
          {"slider"}
          <input
            type="radio"
            name="naam"
            value="tekst"
            checked={this.state.selectedOption === "tekst"}
            onChange={this.handleChangeOption}
            required
          />{" "}
          {"tekst"}
          <input
            type="radio"
            name="naam"
            value="2"
            checked={this.state.selectedOption === "2"}
            onChange={this.handleChangeOption}
            required
          />{" "}
          {"2 opties"}
          <input
            type="radio"
            name="naam"
            value="4"
            checked={this.state.selectedOption === "4"}
            onChange={this.handleChangeOption}
            required
          />{" "}
          {"4 opties"}
          <input
            type="radio"
            name="naam"
            value="8"
            checked={this.state.selectedOption === "8"}
            onChange={this.handleChangeOption}
            required
          />{" "}
          {"8 opties"}
          <input type="submit" value="Stel vraag" />
        </form>
      </>
    );
  }
}

export default Admin;
