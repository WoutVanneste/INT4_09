import React, { useState } from "react";

const SliderInput = () => {
  // react hooks met een waarde en methode om deze aan te passen.
  const initialState = "";
  const [huidigAntwoord, setHuidigAntwoord] = useState(initialState);

  const handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    e.preventDefault();
    console.log(huidigAntwoord);
  };

  const handleChangeSlider = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    setHuidigAntwoord(e.currentTarget.value);
  };

  return (
    <>
      <p>Slider input</p>
      <form onSubmit={handleSubmitForm}>
        <input
          type="range"
          min="0"
          max="100"
          onChange={handleChangeSlider}
          value={huidigAntwoord}
        />
        <input type="submit" value="Antwoorden" />
      </form>
    </>
  );
};

export default SliderInput;
