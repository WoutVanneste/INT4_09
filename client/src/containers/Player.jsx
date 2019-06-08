import React, { Component } from "react";
import Menu from "../components/Menu";
import TweeKeuzeInput from "../components/TweeKeuzeInput";
import VierKeuzeInput from "../components/VierKeuzeInput";
import AchtKeuzeInput from "../components/AchtKeuzeInput";
import TekstInput from "../components/TekstInput";
import SliderInput from "../components/SliderInput";
import Wachtscherm from "../components/Wachtscherm";
import styles from "./Player.module.css";
import { socket } from "./App.js";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = { aantalKeuzes: "" };
  }

  componentDidMount() {
    // Vangt de emit op
    socket.on("question", type => {
      console.log(`socket message`, type);
      this.setState({ aantalKeuzes: type });
      // Verander de state zodat keuzeswitch opnieuw wordt gerenderd
    });
  }

  //op basis van het aantal opties wordt een andere component getoond met het juiste aantal opties.
  //als er niks is meegegeven, komt er een empty state melding.

  //via vraag.location.vraag kunnen we de data die we meegaven vanuit de admin opvragen, zo weten we hoeveel opties er zijn voor de vraag.
  render() {
    const { aantalKeuzes } = this.state;

    const keuzeSwitch = () => {
      switch (aantalKeuzes) {
        case "2":
          return <TweeKeuzeInput />;
        case "4":
          return <VierKeuzeInput />;
        case "8":
          return <AchtKeuzeInput />;
        case "tekst":
          return <TekstInput />;
        case "slider":
          return <SliderInput />;
        case "wachtscherm":
          return <Wachtscherm />;
        default:
          return <p>De gamemaster heeft nog geen vraag doorgestuurd</p>;
      }
    };

    return (
      <>
        <Menu />
        <p className={styles.title}>Player container</p>
        {keuzeSwitch()}
      </>
    );
  }
}

export default Player;
