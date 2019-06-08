import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const TekstInput = () => {
  // react hooks met een waarde en methode om deze aan te passen.
  const initialState = "";
  const [huidigAntwoord, setHuidigAntwoord] = useState(initialState);

  const handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    e.preventDefault();
    console.log(huidigAntwoord);
  };

  const handleChangeTekst = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    setHuidigAntwoord(e.currentTarget.value);
  };

  return (
    <>
      <p>Tekstinput</p>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          onChange={handleChangeTekst}
          value={huidigAntwoord}
        />
        <input type="submit" value="Antwoorden" />
      </form>
    </>
  );
};

export default withRouter(TekstInput);
