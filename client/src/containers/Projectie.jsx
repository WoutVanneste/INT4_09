import React, { Component } from "react";
import Menu from "../components/Menu";
import styles from "./Projectie.module.css";
import { socket } from "./App.js";
import { inject, observer } from "mobx-react";

class Projectie extends Component {
  //const antwoord = antwoordPlayer.location.antwoord;
  roomRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = { antwoorden: [], roomId: "", question: "" };
  }

  componentDidMount() {
    // socket.emit("projectie", "projectie");

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
      //console.log(`id`, id);
    });

    socket.on("question", type => {
      console.log(type.question);
      this.setState({ question: type.question });
    });

    socket.on("tijd op", () => {
      this.props.answerStore.addAnswerToDatabase({
        question: this.state.question,
        answers: [this.state.antwoorden]
      });
    });
  }

  handleJoinRoom = e => {
    e.preventDefault();
    // Room joinen
    if (this.roomRef.current.value) {
      socket.emit("join", this.roomRef.current.value);
      this.setState({ roomId: this.roomRef.current.value });
    }
  };

  render() {
    const { antwoorden, roomId } = this.state;

    if (roomId === "") {
      return (
        <>
          <Menu />
          <p className="title">Projectie container</p>
          <p>Join een room</p>
          <form action="" onSubmit={this.handleJoinRoom}>
            <input type="text" ref={this.roomRef} />
            <input type="submit" value="Join een room" />
          </form>
        </>
      );
    } else {
      return (
        <>
          <Menu />
          <p className="title">Projectie container</p>
          <p>De verschillende antwoorden waren:</p>
          <ul>
            {antwoorden.map(antwoord => (
              <li key={antwoord.antwoord}>{antwoord.antwoord}</li>
            ))}
          </ul>
        </>
      );
    }
  }
}

export default inject(`answerStore`)(observer(Projectie));
