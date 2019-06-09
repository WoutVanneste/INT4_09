import React, { useState } from "react";
import { socket } from "../containers/App.js";
import buttonStyles from "../styles/buttons.module.css";
import styles from "./form.module.css";

const SliderInput = () => {
  // react hooks met een waarde en methode om deze aan te passen.
  const initialState = "";
  const [huidigAntwoord, setHuidigAntwoord] = useState(initialState);

  const handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    e.preventDefault();
    console.log(huidigAntwoord);

    socket.emit("answer", huidigAntwoord); // emit de value van de input.
  };

  const handleChangeSlider = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    setHuidigAntwoord(e.currentTarget.value);
  };

  return (
    <>
      <p>Slider input</p>
      <form onSubmit={handleSubmitForm} className={styles.player_form}>
        <input
          type="range"
          min="0"
          max="100"
          onChange={handleChangeSlider}
          value={huidigAntwoord}
        />
        <input
          type="submit"
          value="Antwoorden"
          className={
            styles.player_submit +
            " " +
            (huidigAntwoord === ""
              ? buttonStyles.submit_form_empty
              : buttonStyles.submit_form)
          }
        />
      </form>
    </>
  );
};

export default SliderInput;
