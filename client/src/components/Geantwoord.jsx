import React, { Component } from "react";
import meldingStyles from "../styles/melding.module.css";

class Geantwoord extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 5 };
  }

  // Na 5 seconden krijgt de speler terug het wachtscherm te zien.
  componentDidMount() {
    this.mijnInterval = setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter >= 1 ? prevState.counter - 1 : 0
      }));
      if (this.state.counter === 0) {
        clearInterval(this.mijnInterval);
        this.props.tijdverstreken();
      }
    }, 1000);
  }

  render() {
    return (
      <p className={meldingStyles.player_melding}>
        Super, je antwoord werd verstuurd!
      </p>
    );
  }
}

export default Geantwoord;
