import React, { Component } from "react";
import { socket } from "./App.js";
import { inject, observer } from "mobx-react";
import roomStyles from "./Admin.module.css";
import styles from "./Projectie.module.css";
import radioStyles from "../styles/radioButtons.module.css";

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
      finaalAntwoord: []
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

  render() {
    const { roomId, question, finaalAntwoord } = this.state;

    if (roomId === "") {
      return (
        <div className={`${roomStyles.room_wrapper} ${styles.room_wrapper}`}>
          <h1 className={roomStyles.title}>Join een room</h1>
          <form
            className={roomStyles.room_form}
            action=""
            onSubmit={this.handleJoinRoom}
          >
            <input
              className={roomStyles.room_input}
              type="text"
              ref={this.roomRef}
              placeholder="Roomnaam"
            />
            <input
              className={roomStyles.submit_form}
              type="submit"
              value="Join een room"
            />
          </form>
        </div>
      );
    } else {
      return (
        <>
          {question ? <p>{question}</p> : ""}
          {finaalAntwoord !== "" || finaalAntwoord === "undefined" ? (
            <>
              <p>Jullie kozen voor:</p>
              <img
                className={radioStyles.svg}
                src={`/assets/img/${finaalAntwoord}.svg`}
                alt={finaalAntwoord}
              />
            </>
          ) : (
            ""
          )}
        </>
      );
    }
  }
}

export default inject(`answerStore`)(observer(Projectie));
