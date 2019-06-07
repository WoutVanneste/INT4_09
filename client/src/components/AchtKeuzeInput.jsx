import React from "react";

const KeuzeInput = () => {
  return (
    <>
      <p>8 opties</p>
      <form>
        <input type="radio" name="naam" value="waarde" /> {"optie 1"}
        <input type="radio" name="naam" value="waarde" /> {"optie 2"}
        <input type="radio" name="naam" value="waarde" /> {"optie 3"}
        <input type="radio" name="naam" value="waarde" /> {"optie 4"}
        <input type="radio" name="naam" value="waarde" /> {"optie 5"}
        <input type="radio" name="naam" value="waarde" /> {"optie 6"}
        <input type="radio" name="naam" value="waarde" /> {"optie 7"}
        <input type="radio" name="naam" value="waarde" /> {"optie 8"}
        <input type="submit" value="Antwoorden" />
      </form>
    </>
  );
};

export default KeuzeInput;
