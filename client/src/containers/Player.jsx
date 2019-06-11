import React, { Component } from "react";
// import Menu from "../components/Menu";
import TweeKeuzeInput from "../components/TweeKeuzeInput";
// import VierKeuzeInput from "../components/VierKeuzeInput";
// import AchtKeuzeInput from "../components/AchtKeuzeInput";
import TekstInput from "../components/TekstInput";
import SliderInput from "../components/SliderInput";
import Wachtscherm from "../components/Wachtscherm";
import TijdOp from "../components/TijdOp";
import Geantwoord from "../components/Geantwoord";
import JoinRoom from "../components/JoinRoom";

import styles from "./Player.module.css";
import taalStyles from "./Home.module.css";

import meldingStyles from "../styles/melding.module.css";
import { socket } from "./App.js";
import { inject, observer } from "mobx-react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aantalKeuzes: "",
      taal: "",
      counter: 60,
      question: "",
      room: ""
    };

    this.antwoordVersturen = this.antwoordVersturen.bind(this);
    this.openWachtscherm = this.openWachtscherm.bind(this);
  }

  componentDidMount() {
    // Vangt de emit op
    socket.on("connect", data => {
      console.log(`connected`, data);
    });
    socket.on("question", type => {
      console.log(`socket message`, type);
      clearInterval(this.mijnInterval);
      // Verander de state zodat keuzeswitch opnieuw wordt gerenderd
      // timer wordt opnieuw op 10 gezet door een nieuwe vraag
      this.setState({ aantalKeuzes: type.type, counter: 60, question: type });
      console.log(`question state`, this.state.question);

      // timer start als je op player komt.
      // de timer css klopt nog niet volledig
      this.mijnInterval = setInterval(() => {
        this.setState(prevState => ({
          counter: prevState.counter >= 1 ? prevState.counter - 1 : 0
        }));
        if (this.state.counter === 0) {
          clearInterval(this.mijnInterval);
          // na 10 seconden krijgt speler scherm 'te laat' te zien
          this.setState({ aantalKeuzes: "te laat" });
        }
      }, 1000);
    });
  }

  openWachtscherm() {
    this.setState({ aantalKeuzes: "wachtscherm" });
  }

  antwoordVersturen = antwoord => {
    console.log(antwoord);
    // console.log(`antwoord verstuurd`);
    this.setState({ aantalKeuzes: "op tijd" });
    clearInterval(this.mijnInterval);
    // console.log(this.props);

    // this.props.answerStore.addAnswerToDatabase({
    //   question: "dit is de tweede vraag",
    //   answers: [{ answer: "dit is het eerste antwoord" }]
    // });
    console.log(this.state.question);
    this.props.answerStore.addAnswerToDatabase({
      question: this.state.question.question,
      answers: [antwoord]
    });
  };

  joinedRoom = roomId => {
    console.log(roomId);
    this.setState({ room: roomId });
  };

  handleClickLanguage = e => {
    console.log(e);
  };

  //op basis van het aantal opties wordt een andere component getoond met het juiste aantal opties.
  //als er niks is meegegeven, komt er een empty state melding.

  //via vraag.location.vraag kunnen we de data die we meegaven vanuit de admin opvragen, zo weten we hoeveel opties er zijn voor de vraag.
  render() {
    const { aantalKeuzes, counter } = this.state;
    // const taalSwitch = () => {
    //   switch (this.state.taal) {
    //     case "nl":
    //       return (
    //         <p className={meldingStyles.player_melding}>
    //           De gamemaster heeft nog geen vraag doorgestuurd
    //         </p>
    //       );
    //     case "fr":
    //       return (
    //         <p className={meldingStyles.player_melding}>
    //           Le gamemaster n'a pas encore envoyé de question
    //         </p>
    //       );
    //     case "en":
    //       return (
    //         <p className={meldingStyles.player_melding}>
    //           The gamemaster has not yet forwarded a question
    //         </p>
    //       );

    //     default:
    //       return (
    //         <p className={meldingStyles.player_melding}>
    //           De gamemaster heeft nog geen vraag doorgestuurd
    //         </p>
    //       );
    //   }
    // };

    const keuzeSwitch = () => {
      switch (aantalKeuzes) {
        case "2":
        case "4":
        case "8":
          return (
            <>
              <div className={styles.vraag_wrapper}>
                <p className={styles.vraag}>{this.state.question.question}</p>

                <div className={styles.timer_wrapper}>
                  <span className={styles.timer}>{counter}</span>
                  <svg className={styles.circle_svg}>
                    <circle
                      r="18"
                      cx="20"
                      cy="20"
                      className={styles.circle + " " + this.timerStijl}
                    />
                  </svg>
                </div>
              </div>
              <TweeKeuzeInput
                verstuurAntwoord={this.antwoordVersturen}
                question={this.state.question}
              />
            </>
          );
        case "text":
          return (
            <>
              <div className={styles.vraag_wrapper}>
                <p className={styles.vraag}>{this.state.question.question}</p>

                <div className={styles.timer_wrapper}>
                  <span className={styles.timer}>{counter}</span>
                  <svg className={styles.circle_svg}>
                    <circle r="18" cx="20" cy="20" className={styles.circle} />
                  </svg>
                </div>
              </div>
              <TekstInput
                verstuurAntwoord={this.antwoordVersturen}
                question={this.state.question}
              />
            </>
          );
        case "slider":
          return (
            <>
              <div className={styles.vraag_wrapper}>
                <p className={styles.vraag}>{this.state.question.question}</p>

                <div className={styles.timer_wrapper}>
                  <span className={styles.timer}>{counter}</span>
                  <svg className={styles.circle_svg}>
                    <circle r="18" cx="20" cy="20" className={styles.circle} />
                  </svg>
                </div>
              </div>
              <SliderInput
                verstuurAntwoord={this.antwoordVersturen}
                question={this.state.question}
              />
            </>
          );
        case "wachtscherm":
          return <Wachtscherm />;
        case "te laat":
          return <TijdOp tijdverstreken={this.openWachtscherm} />;
        case "op tijd":
          return <Geantwoord tijdverstreken={this.openWachtscherm} />;
        default:
          return <Wachtscherm />;
      }
    };

    if (this.state.room === "") {
      console.log(`nog geen room man`);
      return (
        <>
          <JoinRoom joinedRoom={this.joinedRoom} />
        </>
      );
    } else {
      if (this.state.taal === "") {
        return (
          <>
            <h1 className={styles.title}>Selecteer jouw taal</h1>
            <div className={styles.taal_wrapper}>
              <ul>
                <li>
                  <button
                    className={taalStyles.link}
                    onClick={() => this.setState({ taal: "nl" })}
                  >
                    Nederlands
                  </button>
                </li>
                <li>
                  <button
                    className={taalStyles.link}
                    onClick={() => this.setState({ taal: "fr" })}
                  >
                    Fran&ccedil;ais
                  </button>
                </li>
                <li>
                  <button
                    className={taalStyles.link}
                    onClick={() => this.setState({ taal: "en" })}
                  >
                    English
                  </button>
                </li>
              </ul>
            </div>
          </>
        );
      } else {
        console.log(`nu is er een taal`);
        return <>{keuzeSwitch()}</>;
      }
    }
  }
}

export default inject(`answerStore`)(observer(Player));
