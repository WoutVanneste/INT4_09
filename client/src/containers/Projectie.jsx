import React, { Component } from "react";
import Menu from "../components/Menu";
import styles from "./Projectie.module.css";
import { socket } from "./App.js";

class Projectie extends Component {
  //const antwoord = antwoordPlayer.location.antwoord;
  constructor(props) {
    super(props);
    this.state = { antwoord: "" };
  }

  componentDidMount() {
    // Vangt de emit op
    socket.on("answer", answer => {
      console.log(`socket message`, answer);
      this.setState({ antwoord: answer });
      // Verander de state zodat keuzeswitch opnieuw wordt gerenderd
    });
  }

  render() {
    const { antwoord } = this.state;
    return (
      <>
        <Menu />
        <p className={styles.title}>Projectie container</p>
        <p>Het antwoord van de speler was: {antwoord}</p>
      </>
    );
  }
}

export default Projectie;
