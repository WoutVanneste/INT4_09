import React, { useState } from "react";
import { socket } from "../containers/App.js";
import radioStyles from "../styles/radioButtons.module.css";
import buttonStyles from "../styles/buttons.module.css";
import styles from "./form.module.css";

const AchtKeuzeInput = () => {
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
    <form onSubmit={handleSubmitForm} className={styles.player_form}>
      <div className={styles.player_input_wrapper}>
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
        <label htmlFor="optie3" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie3"
            name="keuze"
            value="optie 3"
            checked={huidigAntwoord === "optie 3"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 3</span>
        </label>
        <label htmlFor="optie4" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie4"
            name="keuze"
            value="optie 4"
            checked={huidigAntwoord === "optie 4"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 4</span>
        </label>
        <label htmlFor="optie5" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie5"
            name="keuze"
            value="optie 5"
            checked={huidigAntwoord === "optie 5"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 5</span>
        </label>
        <label htmlFor="optie6" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie6"
            name="keuze"
            value="optie 6"
            checked={huidigAntwoord === "optie 6"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 6</span>
        </label>
        <label htmlFor="optie7" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie7"
            name="keuze"
            value="optie 7"
            checked={huidigAntwoord === "optie 7"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 7</span>
        </label>
        <label htmlFor="optie8" className={radioStyles.radio_label}>
          <input
            type="radio"
            id="optie8"
            name="keuze"
            value="optie 8"
            checked={huidigAntwoord === "optie 8"}
            onChange={handleChangeRadio}
            className={radioStyles.radio_input}
          />
          <span className={radioStyles.radio_span}>optie 8</span>
        </label>
      </div>
      <input
        className={
          styles.player_submit +
          " " +
          (huidigAntwoord === ""
            ? buttonStyles.submit_form_empty
            : buttonStyles.submit_form)
        }
        type="submit"
        value="Antwoorden"
        disabled={huidigAntwoord === "" ? true : false}
      />
    </form>
  );
};

export default AchtKeuzeInput;
