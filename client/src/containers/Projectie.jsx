import React, { Component } from "react";
import Menu from "../components/Menu";
import styles from "./Projectie.module.css";
import { socket } from "./App.js";

class Projectie extends Component {
  //const antwoord = antwoordPlayer.location.antwoord;
  roomRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = { antwoorden: [], roomId: "" };
  }

  componentDidMount() {
    // Vangt de emit op
    socket.on("clear", answer => {
      this.setState({ antwoorden: [] });
    });

    socket.on("answer", answer => {
      console.log(`socket message`, answer);
      //this.setState({ antwoorden: answer });

      this.setState({
        antwoorden: [...this.state.antwoorden, answer]
      });
      // Verander de state zodat keuzeswitch opnieuw wordt gerenderd
    });
  }

  handleJoinRoom = e => {
    e.preventDefault();
    console.log(this.roomRef.current.value);
    if (this.roomRef.current.value) {
      socket.emit("join", this.roomRef.current.value);
      this.setState({ roomId: this.roomRef.current.value });
      //props.joinedRoom(this.roomRef.current.value);
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
              <li key={antwoord}>{antwoord}</li>
            ))}
          </ul>
        </>
      );
    }
  }
}

export default Projectie;
