import React, { Component } from "react";
import Menu from "../components/Menu";
import styles from "./Admin.module.css";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: "2" };
  }
  handleSubmitForm = () => {
    //hier wordt de gebruiker doorgestuurd naar de player pagina, we geven ook het aantal opties mee voor de vraag.
    //'vraag' is de data die we meegeven om in de player component uit te lezen.
    this.props.history.push({
      pathname: "/player",
      vraag: this.state.selectedOption
    });
  };
  handleChangeOption = e => {
    //iedere keer en andere radio button wordt aangeklikt, wordt dit aangepast in de state.
    this.setState({ selectedOption: e.currentTarget.value });
  };
  render() {
    return (
      <>
        <Menu />
        <p className={styles.title}>Admin container</p>
        <form action="" onSubmit={this.handleSubmitForm}>
          <input
            type="radio"
            name="naam"
            value="2"
            checked={this.state.selectedOption === "2"}
            onChange={this.handleChangeOption}
          />{" "}
          {"2 vragen"}
          <input
            type="radio"
            name="naam"
            value="4"
            checked={this.state.selectedOption === "4"}
            onChange={this.handleChangeOption}
          />{" "}
          {"4 vragen"}
          <input
            type="radio"
            name="naam"
            value="8"
            checked={this.state.selectedOption === "8"}
            onChange={this.handleChangeOption}
          />{" "}
          {"8 vragen"}
          <input type="submit" value="Stel vraag" />
        </form>
      </>
    );
  }
}

export default Admin;
