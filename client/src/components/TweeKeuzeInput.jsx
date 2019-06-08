import React, { useState } from "react";
import { socket } from "../containers/App.js";
import radioStyles from "../styles/radioButtons.module.css";
import buttonStyles from "../styles/buttons.module.css";

const TweeKeuzeInput = () => {
  // react hooks met een waarde en methode om deze aan te passen.
  const initialState = "";
  const [huidigAntwoord, setHuidigAntwoord] = useState(initialState);

  const handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    e.preventDefault();
    console.log(huidigAntwoord);

    socket.emit("answer", huidigAntwoord); // emit de value van de input.
  };

  const handleChangeRadio = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    setHuidigAntwoord(e.currentTarget.value);
  };

  return (
    <>
      <p>De gamemaster gaf je 2 opties</p>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="optie1" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie1"
            name="keuze"
            value="optie 1"
            checked={huidigAntwoord === "optie 1"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 1</span>
        </label>
        <label htmlFor="optie2" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie2"
            name="keuze"
            value="optie 2"
            checked={huidigAntwoord === "optie 2"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 2</span>
        </label>
        <input
          className={
            huidigAntwoord === ""
              ? buttonStyles.submit_form_empty
              : buttonStyles.submit_form
          }
          type="submit"
          value="Antwoorden"
          disabled={huidigAntwoord === "" ? true : false}
        />
      </form>
    </>
  );
};

export default TweeKeuzeInput;