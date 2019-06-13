import React, { Component } from "react";
import meldingStyles from "../styles/melding.module.css";
class TijdOp extends Component {
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
      <div className={meldingStyles.player_melding_wrapper}>
        <p className={meldingStyles.player_melding}>Helaas, de tijd is om!</p>
      </div>
    );
  }
}

export default TijdOp;
