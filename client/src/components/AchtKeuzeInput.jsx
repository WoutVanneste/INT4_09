import React, { useState } from "react";

const AchtKeuzeInput = () => {
  // react hooks met een waarde en methode om deze aan te passen.
  const initialState = "";
  const [huidigAntwoord, setHuidigAntwoord] = useState(initialState);

  const handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    e.preventDefault();
    console.log(huidigAntwoord);
  };

  const handleChangeRadio = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    setHuidigAntwoord(e.currentTarget.value);
  };

  return (
    <>
      <p>De gamemaster gaf je 8 opties</p>
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
        <input
          type="radio"
          name="naam"
          value="optie 5"
          checked={huidigAntwoord === "optie 5"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 5"}
        <input
          type="radio"
          name="naam"
          value="optie 6"
          checked={huidigAntwoord === "optie 6"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 6"}
        <input
          type="radio"
          name="naam"
          value="optie 7"
          checked={huidigAntwoord === "optie 7"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 7"}
        <input
          type="radio"
          name="naam"
          value="optie 8"
          checked={huidigAntwoord === "optie 8"}
          onChange={handleChangeRadio}
        />{" "}
        {"optie 8"}
        <input type="submit" value="Antwoorden" />
      </form>
    </>
  );
};

export default AchtKeuzeInput;
