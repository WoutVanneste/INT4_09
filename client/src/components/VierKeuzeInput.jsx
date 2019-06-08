import React, { useState } from "react";
import { socket } from "../containers/App.js";

const VierKeuzeInput = () => {
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
      <p>De gamemaster gaf je 4 opties</p>
      <form onSubmit={handleSubmitForm}>
        <input
          type="radio"
          name="naam"
          value="optie 1"
          checked={huidigAntwoord === "optie 1"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 1"}
        <input
          type="radio"
          name="naam"
          value="optie 2"
          checked={huidigAntwoord === "optie 2"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 2"}
        <input
          type="radio"
          name="naam"
          value="optie 3"
          checked={huidigAntwoord === "optie 3"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 3"}
        <input
          type="radio"
          name="naam"
          value="optie 4"
          checked={huidigAntwoord === "optie 4"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 4"}
        <input type="submit" value="Antwoorden" />
      </form>
    </>
  );
};

export default VierKeuzeInput;
