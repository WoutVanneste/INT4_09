import React, { Component } from "react";
// import Menu from "../components/Menu";
// import styles from "./Projectie.module.css";
import { socket } from "./App.js";
import { inject, observer } from "mobx-react";
import roomStyles from "./Admin.module.css";
import styles from "./Projectie.module.css";

class Projectie extends Component {
  //const antwoord = antwoordPlayer.location.antwoord;
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
      this.setState({ antwoorden: [] });
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
      this.setState({ mogelijkeAntwoorden: type.options });
      console.log(`mogelijke antwoorden`, this.state.mogelijkeAntwoorden);
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

  // calculateAnswers = antwoorden => {
  //   const map = antwoorden.reduce((obj, b) => {
  //     obj[b] = ++obj[b] || 1;
  //     return obj;
  //   }, {});

  //   console.log(map);
  // };

  showWinningAnswer = () => {
    console.log(`toon het antwoord`);
  };

  render() {
    const {
      roomId,
      question /*, antwoorden, mogelijkeAntwoorden */
    } = this.state;

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
          <p>Jullie kozen voor:</p>
          {/* <ul>
            {mogelijkeAntwoorden.map(antwoord => (
              <li key={antwoord}>{antwoord} - 0%</li>
            ))}
          </ul> */}
          {/* <ul>
            {antwoorden.map(antwoord => (
              <li key={antwoord.antwoord}>{antwoord.antwoord}</li>
            ))}
          </ul> */}
        </>
      );
    }
  }
}

export default inject(`answerStore`)(observer(Projectie));
