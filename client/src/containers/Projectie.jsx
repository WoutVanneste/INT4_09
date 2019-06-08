import React, { Component } from "react";
import Menu from "../components/Menu";
import styles from "./Projectie.module.css";
import { socket } from "./App.js";

class Projectie extends Component {
  //const antwoord = antwoordPlayer.location.antwoord;
  constructor(props) {
    super(props);
    this.state = { antwoorden: [] };
  }

  componentDidMount() {
    // Vangt de emit op
    socket.on("answer", answer => {
      console.log(`socket message`, answer);
      //this.setState({ antwoorden: answer });

      this.setState({
        antwoorden: [...this.state.antwoorden, answer]
      });
      // Verander de state zodat keuzeswitch opnieuw wordt gerenderd
    });
  }

  render() {
    const { antwoorden } = this.state;
    return (
      <>
        <Menu />
        <p className={styles.title}>Projectie container</p>
        <p>De verschillende antwoorden waren:</p>
        <ul>
          {antwoorden.map(antwoord => (
            <li key={antwoord}>{antwoord}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default Projectie;
