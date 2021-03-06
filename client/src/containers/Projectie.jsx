import React, { Component } from "react";
import { socket } from "./App.js";
import { inject, observer } from "mobx-react";
import kamerStyles from "../components/Kamer.module.css";
import buttonStyles from "../styles/buttons.module.css";
import meldingStyles from "../styles/melding.module.css";
import styles from "./Projectie.module.css";

class Projectie extends Component {
  roomRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      antwoorden: [],
      roomId: "",
      question: "",
      mogelijkeAntwoorden: [],
      enkelAntwoorden: [],
      antwoordTest: [],
      finaalAntwoord: [],
      roomname: ""
    };
  }

  componentDidMount() {
    // Vangt de emit op
    socket.on("clear", answer => {
      this.setState({ antwoorden: [], enkelAntwoorden: [] });
    });

    socket.on("answer", ({ antwoord, id }) => {
      // antwoord toevoegen aan de state indien een nieuw antwoord binnekomt
      this.setState({
        antwoorden: [...this.state.antwoorden, { antwoord: antwoord, id: id }]
      });

      // maak een array met alleen de antwoorden aan
      this.setState({
        enkelAntwoorden: [...this.state.enkelAntwoorden, antwoord]
      });
    });

    socket.on("question", type => {
      this.setState({ question: type.question });
      this.setState({ finaalAntwoord: "" });
    });

    socket.on("tijd op", () => {
      this.props.answerStore.addAnswerToDatabase({
        question: this.state.question,
        answers: [this.state.antwoorden]
      });

      // Tijd is op? toon de antwoorden
      this.showWinningAnswer();
    });
  }

  handleJoinRoom = e => {
    e.preventDefault();
    // Room joinen
    if (this.roomRef.current.value) {
      socket.emit("join", {
        room: this.roomRef.current.value,
        user: "projectie"
      });
      this.setState({ roomId: this.roomRef.current.value });
    }
  };

  handleChangeInput = e => {
    this.setState({ roomname: e.currentTarget.value });
  };

  showWinningAnswer = () => {
    let counts = {};
    let compare = 0;
    let mostFrequent = "";
    for (var i = 0, len = this.state.enkelAntwoorden.length; i < len; i++) {
      let antwoord = this.state.enkelAntwoorden[i];

      if (counts[antwoord] === undefined) {
        counts[antwoord] = 1;
      } else {
        counts[antwoord] = counts[antwoord] + 1;
      }
      if (counts[antwoord] > compare) {
        compare = counts[antwoord];
        mostFrequent = this.state.enkelAntwoorden[i];
      }
    }

    this.setState({ finaalAntwoord: mostFrequent });
  };

  showProjection(question, finaalAntwoord) {
    return (
      <>
        <div
          className={
            finaalAntwoord != "" || finaalAntwoord === "undefined"
              ? `${meldingStyles.player_melding_wrapper} ${
                  meldingStyles.player_melding_wrapper_small
                }`
              : meldingStyles.player_melding_wrapper
          }
        >
          {question ? (
            <p className={meldingStyles.player_melding}>{question}</p>
          ) : (
            ""
          )}
        </div>

        {finaalAntwoord != "" || finaalAntwoord === "undefined" ? (
          <div className={styles.antwoord_wrapper}>
            <h1 className={styles.antwoord}>Jullie kozen voor:</h1>
            <img
              className={styles.img}
              src={`/assets/img/${finaalAntwoord}.svg`}
              alt={finaalAntwoord}
            />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }

  render() {
    const { roomId, question, finaalAntwoord } = this.state;

    if (roomId === "") {
      return (
        <div className={kamerStyles.room_wrapper}>
          <div className={kamerStyles.title_wrapper}>
            <h1 className={kamerStyles.title}>Vul hier de kamernaam in</h1>
            <div className={kamerStyles.role}>
              <p className={kamerStyles.role_name}>projectie</p>
            </div>
          </div>
          <form
            className={kamerStyles.form_wrapper}
            action=""
            onSubmit={this.handleJoinRoom}
          >
            <input
              className={
                this.state.roomname === ""
                  ? kamerStyles.input
                  : kamerStyles.input_true
              }
              type="text"
              ref={this.roomRef}
              placeholder="Kamernaam"
              onChange={this.handleChangeInput}
            />
            <input
              className={
                this.state.roomname === ""
                  ? buttonStyles.submit_form_empty
                  : buttonStyles.submit_form
              }
              type="submit"
              value="Deelnemen met kamer"
            />
          </form>
        </div>
      );
    } else {
      return (
        <>
          {finaalAntwoord != "" || finaalAntwoord === "undefined" ? (
            <div className={meldingStyles.player_melding_full_wrapper}>
              {this.showProjection(question, finaalAntwoord)}
            </div>
          ) : (
            this.showProjection(question, finaalAntwoord)
          )}
        </>
      );
    }
  }
}

export default inject(`answerStore`)(observer(Projectie));
