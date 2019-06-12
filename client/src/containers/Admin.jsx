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
      numberOfAnswers: 0,
      playerCount: 0,
      counter: 15,
      currentQuestion: 0
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
        // na 10 seconden krijgt speler scherm 'te laat' te zien
        socket.emit("tijd op", this.state.roomName);
      }
    }, 1000);
  };

  handleChangeOption = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ selectedOption: parseInt(e.currentTarget.value, 10) }); // aangeduide optie in state opslaan als een Int
  };

  handleCreateRoom = e => {
    e.preventDefault();
    socket.emit("join", { room: this.state.roomName, user: "admin" }); // join de room
  };

  handleChangeRoomTekst = e => {
    this.setState({ roomName: e.currentTarget.value });
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

    return (
      <div className={styles.total_wrapper}>
        <div className={styles.room_wrapper}>
          <h1 className={styles.title}>Maak een room aan</h1>
          <form
            className={styles.room_form}
            action=""
            onSubmit={this.handleCreateRoom}
          >
            <input
              className={styles.room_input}
              type="text"
              onChange={this.handleChangeRoomTekst}
              placeholder="Roomnaam"
            />
            <input
              className={
                this.state.roomName === ""
                  ? styles.submit_form_empty
                  : styles.submit_form
              }
              type="submit"
              value="Maak een room"
            />
          </form>
        </div>

        <div>
          <p className={`${styles.room_info} ${styles.room_info_naam}`}>
            Room name: {this.state.roomName}
          </p>
          <p className={`${styles.room_info} ${styles.room_info_aantal}`}>
            Aantal antwoorden voor deze vraag: {numberOfAnswers}
          </p>
          <p>{`aantal spelers in de room: ${playerCount}`}</p>
          <p>{`aantal antwoorden op deze vraag: ${numberOfAnswers}/${playerCount}`}</p>
          <span className={styles.timer}>{counter}</span>
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
                <span className={radioStyles.radio_span}>
                  {
                    this.props.questionStore.questions[
                      this.state.currentQuestion
                    ].question
                  }
                </span>
              ) : (
                <span className={radioStyles.radio_span}>vragen zijn op</span>
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
              styles.admin_submit +
              " " +
              (selectedOption === ""
                ? buttonStyles.submit_form_empty
                : buttonStyles.submit_form)
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
        {/* <div className={styles.wachtscherm_wrapper}>
          <p className={styles.wachtscherm_tekst}>
            Laat de spelers maar weer wachten
          </p>
          <button
            className={buttonStyles.submit_form}
            onClick={this.handleClickButton}
          >
            Wachtscherm
          </button>
        </div> */}
      </div>
    );
  }
}

export default inject(`questionStore`, `answerStore`)(observer(Admin));
