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
      playerCount: 0
    };
  }
  handleSubmitForm = e => {
    e.preventDefault(); // stop form versturen
    console.log(
      "nieuwtestje",
      this.props.questionStore.questions[this.state.selectedOption]
    );
    socket.emit("question", {
      // stuur een socket vraag event en geef de vraag en room mee

      question: this.props.questionStore.questions[this.state.selectedOption],
      room: this.state.roomName
    });
    socket.emit("clear", true); // verwijder alles op de projectie
  };

  handleChangeOption = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ selectedOption: parseInt(e.currentTarget.value, 10) }); // aangeduide optie in state opslaan als een Int

    // code toen state genest was
    // this.setState({
    //   selectedOption: {
    //     ...this.state.selectedOption,
    //     type: e.currentTarget.value
    //   }
    // });
  };

  handleCreateRoom = e => {
    e.preventDefault();
    socket.emit("join", this.state.roomName); // join de room
  };

  handleChangeRoomTekst = e => {
    this.setState({ roomName: e.currentTarget.value });
  };

  handleClickButton = e => {
    //spelers krijgen een wachtscherm te zien.
    e.preventDefault();
    //this.setState({ selectedOption: "wachtscherm" });
    // this.setState({
    //   selectedOption: {
    //     ...this.state.selectedOption,
    //     type: "wachtscherm"
    //   }
    // });
    socket.emit("question", { type: "wachtscherm" }); // stuur wachtscherm door via socket
  };

  componentDidMount() {
    socket.on("question", type => {
      // vang een socket emit op. Puur om te testen of de vraag verstuurd was, mag weg later
      console.log(`socket message`, type);
    });

    // socket.emit("admin", "admin");

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
    });

    // socket.on("player count", playerCount => {
    //   this.setState({ playerCount: playerCount });
    // });
  }

  render() {
    const { selectedOption /*, playerCount*/, numberOfAnswers } = this.state;

    return (
      <>
        {/* <Menu /> */}
        {/* <p>{`aantal spelers: ${playerCount}`}</p> */}

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
            />
            <input
              className={`${buttonStyles.submit_form} ${styles.room_submit}`}
              type="submit"
              value="Maak een room"
            />
          </form>
          <p className={`${styles.room_info} ${styles.room_info_naam}`}>
            Room name: {this.state.roomName}
          </p>
          <p className={`${styles.room_info} ${styles.room_info_aantal}`}>
            Aantal antwoorden voor deze vraag: {numberOfAnswers}
          </p>
        </div>
        <p className={styles.admin_keuze}>
          Kies welk soort vraag moeten de spelers krijgen?
        </p>
        <form
          action=""
          onSubmit={this.handleSubmitForm}
          className={styles.admin_form}
        >
          <div className={styles.admin_input_wrapper}>
            {this.props.questionStore.questions.length > 0 ? (
              this.props.questionStore.questions.map((question, index) => (
                <label
                  htmlFor={question._id}
                  className={radioStyles.radio_label}
                  key={`vraag_${question._id}`}
                >
                  <input
                    id={question._id}
                    type="radio"
                    name="keuze"
                    value={index}
                    checked={selectedOption === index}
                    onChange={this.handleChangeOption}
                    required
                    className={radioStyles.radio_input}
                  />
                  <span className={radioStyles.radio_span}>
                    {question.question}
                  </span>
                </label>
              ))
            ) : (
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
            disabled={selectedOption === "" ? true : false}
          />
        </form>
        <div className={styles.wachtscherm_wrapper}>
          <p className={styles.wachtscherm_tekst}>
            Laat de spelers maar weer wachten
          </p>
          <button
            className={buttonStyles.submit_form}
            onClick={this.handleClickButton}
          >
            Wachtscherm
          </button>
        </div>
      </>
    );
  }
}

export default inject(`questionStore`)(observer(Admin));
