import React from "react";

const SliderInput = () => {
  return (
    <>
      <p>Slider input</p>
      <form action="">
        <input type="range" min="0" max="100" />
        <input type="submit" value="Antwoorden" />
      </form>
    </>
  );
};

export default SliderInput;
