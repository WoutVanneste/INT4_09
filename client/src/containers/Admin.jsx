import React, { Component } from "react";
// import Menu from "../components/Menu";
import styles from "./Admin.module.css";
import radioStyles from "../styles/radioButtons.module.css";
import buttonStyles from "../styles/buttons.module.css";
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
    console.log(`grijs`);

    if (
      this.state.currentQuestion < this.props.questionStore.questions.length
    ) {
      this.setState((prevState, props) => ({
        currentQuestion: parseInt((prevState.currentQuestion += 1))
      }));
    } else {
      console.log(`Er zijn geen vragen meer`);
    }

    console.log(this.state.currentQuestion);
    console.log(`lengte`, this.props.questionStore.questions.length);

    this.mijnInterval = setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter >= 1 ? prevState.counter - 1 : 0
      }));
      if (this.state.counter === 0) {
        clearInterval(this.mijnInterval);
        // na 15 seconden krijgt speler scherm 'te laat' te zien
        socket.emit("tijd op", this.state.roomName);
        this.setState({ counter: 15 });
        this.setState({ questionIsBeingAnswered: false });
        console.log(`terug wit`);
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
      this.setState({ aantalPlayers: players });
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
      console.log(`socket message`, type);
    });

    socket.on("user joined", msg => {
      console.log(`user joined`);
    });

    socket.on("clear", msg => {
      this.setState({ numberOfAnswers: 0 });
    });

    socket.on("answer", msg => {
      this.setState((prevState, props) => ({
        numberOfAnswers: parseInt((prevState.numberOfAnswers += 1))
      }));
      console.log(`antwoord gegeven`);
      if (this.state.numberOfAnswers === this.state.playerCount) {
        socket.emit("tijd op", this.state.roomName);
        console.log(`iedereen heeft geantwoord`);
        clearInterval(this.mijnInterval);
        this.setState({ counter: 15 });
        this.setState({ questionIsBeingAnswered: false });
        console.log(`terug naar wit`);
      }
    });

    socket.on("player count", playerCount => {
      this.setState({ playerCount: playerCount });
      console.log(`user connected`);
      console.log(this.state.playerCount);
    });
  }

  render() {
    const {
      selectedOption,
      playerCount,
      numberOfAnswers,
      counter
    } = this.state;

    if (this.state.room === false) {
      return (
        <>
          <div className={styles.total_wrapper}>
            <div className={styles.title_wrapper}>
              <h1 className={styles.title}>Vul hier de roomnaam in</h1>
              <div className={styles.role}>
                <p className={styles.role_name}>Admin</p>
              </div>
            </div>
            <form
              className={styles.admin_form}
              action=""
              onSubmit={this.handleCreateRoom}
            >
              <input
                className={
                  this.state.roomName === "" ? styles.input : styles.input_true
                }
                type="text"
                onChange={this.handleChangeRoomTekst}
                placeholder="Roomnaam"
              />
              <input
                className={
                  styles.admin_submit +
                  " " +
                  (this.state.roomName === ""
                    ? buttonStyles.submit_form_empty
                    : buttonStyles.submit_form)
                }
                type="submit"
                value="Maak een room"
                disabled={
                  this.state.currentQuestion <
                  this.props.questionStore.questions.length
                    ? false
                    : true
                }
              />
            </form>
          </div>
        </>
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
                      className={`${styles.admin_vraag} ${
                        this.state.questionIsBeingAnswered ? "" : ""
                      }`}
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
                  // this.props.questionStore.questions.map((question, index) => (
                  //   <label
                  //     htmlFor={question._id}
                  //     className={radioStyles.radio_label}
                  //     key={`vraag_${question._id}`}
                  //   >
                  //     <input
                  //       id={question._id}
                  //       type="radio"
                  //       name="keuze"
                  //       value={index}
                  //       checked={selectedOption === index}
                  //       onChange={this.handleChangeOption}
                  //       required
                  //       className={radioStyles.radio_input}
                  //     />
                  //     <span className={radioStyles.radio_span}>
                  //       {question.question}
                  //     </span>
                  //   </label>
                  // ))
                  // <label
                  //     htmlFor={question._id}
                  //     className={radioStyles.radio_label}
                  //     key={`vraag_${question._id}`}
                  //   >
                  //     <input
                  //       id={question._id}
                  //       type="radio"
                  //       name="keuze"
                  //       value={index}
                  //       checked={selectedOption === index}
                  //       onChange={this.handleChangeOption}
                  //       required
                  //       className={radioStyles.radio_input}
                  //     />

                  // </label>
                  <p>Vragen aan het ophalen...</p>
                )}
              </div>
              <input
                className={
                  selectedOption === ""
                    ? buttonStyles.submit_form_empty
                    : buttonStyles.submit_form
                }
                type="submit"
                value="Verstuur vraag"
                disabled={
                  this.state.currentQuestion <
                  this.props.questionStore.questions.length
                    ? false
                    : true
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
