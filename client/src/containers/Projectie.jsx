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
      console.log(`antwoorden`, this.state.antwoorden);

      // maak een array met alleen de antwoorden aan
      this.setState({
        enkelAntwoorden: [...this.state.enkelAntwoorden, antwoord]
      });
      console.log(`enkel antwoorden`, this.state.enkelAntwoorden);
      //this.calculateAnswers(this.state.enkelAntwoorden);
    });

    socket.on("question", type => {
      console.log(type);
      this.setState({ question: type.question });
      // this.setState({ mogelijkeAntwoorden: type.options });
      console.log(`mogelijke antwoorden`, this.state.mogelijkeAntwoorden);
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

    console.log(`toon het antwoord`);
    this.setState({ finaalAntwoord: mostFrequent });
    console.log(this.state.finaalAntwoord);
  };

  checkImg = img => {
    // Hier wordt gecontroleerd of de svg die we ophalen bestaat
    // indien deze niet bestaat betekent dit dat het een jpg moet zijn.

    var http = new XMLHttpRequest();
    const path = `/assets/img/${img}.svg`;

    http.open("GET", path, false);
    http.send();

    if (http.status != 404) {
      return (
        <img className={styles.img} src={`/assets/img/${img}.svg`} alt={img} />
      );
    } else {
      return (
        <img className={styles.img} src={`/assets/img/${img}.jpg`} alt={img} />
      );
    }
  };

  showProjection(question, finaalAntwoord) {
    console.log(question, finaalAntwoord);
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
            {this.checkImg(finaalAntwoord)}
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
