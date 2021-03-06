import React, { Component } from "react";
import styles from "./Admin.module.css";
import buttonStyles from "../styles/buttons.module.css";
import kamerStyles from "../components/Kamer.module.css";
import { socket } from "./App.js";
import { inject, observer } from "mobx-react";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 0,
      roomName: "",
      room: false,
      numberOfAnswers: 0,
      playerCount: 0,
      counter: 15,
      currentQuestion: 0,
      questionIsBeingAnswered: false
    };
  }
  handleSubmitForm = e => {
    e.preventDefault(); // stop form versturen

    socket.emit("clear", { message: true, room: this.state.roomName }); // verwijder alles op de projectie

    socket.emit("question", {
      // stuur een socket vraag event en geef de vraag en room mee
      question: this.props.questionStore.questions[this.state.currentQuestion],
      room: this.state.roomName
    });
    clearInterval(this.mijnInterval);
    this.setState({ questionIsBeingAnswered: true });

    if (
      this.state.currentQuestion < this.props.questionStore.questions.length
    ) {
      this.setState((prevState, props) => ({
        currentQuestion: parseInt((prevState.currentQuestion += 1))
      }));
    } else {
      this.setState({ questionIsBeingAnswered: true });
    }

    this.mijnInterval = setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter >= 1 ? prevState.counter - 1 : 0
      }));
      if (this.state.counter === 0) {
        clearInterval(this.mijnInterval);
        // na 15 seconden krijgt speler scherm 'te laat' te zien
        socket.emit("tijd op", this.state.roomName);
        this.setState({ counter: 15 });
        if (
          this.state.currentQuestion < this.props.questionStore.questions.length
        ) {
          this.setState({ questionIsBeingAnswered: false });
        }
      }
    }, 1000);
  };

  handleChangeOption = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ selectedOption: parseInt(e.currentTarget.value, 10) }); // aangeduide optie in state opslaan als een Int
  };

  handleCreateRoom = e => {
    e.preventDefault();
    this.setState({ room: true });
    socket.emit("join", {
      room: this.state.roomName.toLowerCase(),
      user: "admin"
    }); // join de room

    //Laad de speler counter opnieuw in bij het joinen van een room.
    socket.emit("get players", this.state.roomName);
    socket.on("player count", players => {
      if (players == undefined) {
        this.setState({ aantalPlayers: 0 });
      } else {
        this.setState({ aantalPlayers: players });
      }
    });
  };

  handleChangeRoomTekst = e => {
    this.setState({ roomName: e.currentTarget.value.toLowerCase() });
  };

  handleClickButton = e => {
    //spelers krijgen een wachtscherm te zien.
    e.preventDefault();
    socket.emit("question", { type: "wachtscherm" }); // stuur wachtscherm door via socket
  };

  componentDidMount() {
    socket.on("question", type => {
      // vang een socket emit op. Puur om te testen of de vraag verstuurd was, mag weg later
    });

    socket.on("user joined", msg => {});

    socket.on("clear", msg => {
      this.setState({ numberOfAnswers: 0 });
    });

    socket.on("answer", msg => {
      this.setState((prevState, props) => ({
        numberOfAnswers: parseInt((prevState.numberOfAnswers += 1))
      }));
      if (this.state.numberOfAnswers === this.state.playerCount) {
        socket.emit("tijd op", this.state.roomName);
        clearInterval(this.mijnInterval);
        this.setState({ counter: 15 });
        if (
          this.state.currentQuestion < this.props.questionStore.questions.length
        ) {
          this.setState({ questionIsBeingAnswered: false });
        } else {
          this.setState({ questionIsBeingAnswered: true });
        }
      }
    });

    socket.on("player count", playerCount => {
      this.setState({ playerCount: playerCount });
    });
  }

  render() {
    const { playerCount, numberOfAnswers, counter } = this.state;

    if (this.state.room === false) {
      return (
        <div className={kamerStyles.room_wrapper}>
          <div className={kamerStyles.title_wrapper}>
            <h1 className={kamerStyles.title}>Vul hier de kamernaam in</h1>
            <div className={kamerStyles.role}>
              <p className={kamerStyles.role_name}>admin</p>
            </div>
          </div>
          <form
            className={kamerStyles.form_wrapper}
            action=""
            onSubmit={this.handleCreateRoom}
          >
            <input
              className={
                this.state.roomName === ""
                  ? kamerStyles.input
                  : kamerStyles.input_true
              }
              type="text"
              onChange={this.handleChangeRoomTekst}
              placeholder="Kamernaam"
            />
            <input
              className={
                this.state.roomName === ""
                  ? buttonStyles.submit_form_empty
                  : buttonStyles.submit_form
              }
              type="submit"
              value="Maak een kamer"
              disabled={
                this.state.currentQuestion <
                this.props.questionStore.questions.length
                  ? false
                  : true
              }
            />
          </form>
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.total_wrapper_questions}>
            <div className={styles.top_wrapper}>
              <div className={styles.room_block}>
                <p className={styles.room_name}>{this.state.roomName}</p>
              </div>

              <div className={styles.about_block}>
                <div className={styles.room_info}>
                  <p className={styles.aantal_antwoorden}>
                    Antwoorden op deze vraag: {numberOfAnswers}/{playerCount}
                  </p>
                  <p>Spelers in de room: {playerCount}</p>
                </div>
                <span className={styles.timer}>Timer: {counter}</span>
              </div>
            </div>
            <form
              action=""
              onSubmit={this.handleSubmitForm}
              className={styles.admin_form}
            >
              <div className={styles.admin_input_wrapper}>
                {this.props.questionStore.questions.length > 0 ? (
                  this.state.currentQuestion <
                  this.props.questionStore.questions.length ? (
                    <span
                      className={
                        this.state.questionIsBeingAnswered
                          ? styles.admin_vraag_grey
                          : styles.admin_vraag
                      }
                    >
                      {
                        this.props.questionStore.questions[
                          this.state.currentQuestion
                        ].question
                      }
                    </span>
                  ) : (
                    <span className={styles.admin_vraag}>vragen zijn op</span>
                  )
                ) : (
                  <p>Vragen aan het ophalen...</p>
                )}
              </div>
              <input
                className={
                  (this.state.questionIsBeingAnswered === true
                    ? buttonStyles.submit_form_empty
                    : buttonStyles.submit_form) ||
                  (this.state.currentQuestion <
                  this.props.questionStore.questions.length
                    ? buttonStyles.submit_form
                    : buttonStyles.submit_form_empty)
                }
                type="submit"
                value="Verstuur vraag"
                disabled={
                  (this.state.currentQuestion <
                  this.props.questionStore.questions.length
                    ? false
                    : true) ||
                  (this.state.questionIsBeingAnswered === true ? true : false)
                }
              />
            </form>
          </div>
        </>
      );
    }
  }
}

export default inject(`questionStore`, `answerStore`)(observer(Admin));
