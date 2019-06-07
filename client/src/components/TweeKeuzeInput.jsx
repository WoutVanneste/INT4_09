import React from "react";

const KeuzeInput = () => {
  return (
    <>
      <p>2 opties</p>
      <form>
        <input type="radio" name="naam" value="waarde" /> {"optie 1"}
        <input type="radio" name="naam" value="waarde" /> {"optie 2"}
        <input type="submit" value="Antwoorden" />
      </form>
    </>
  );
};

export default KeuzeInput;
