import React, { useState } from "react";
import Menu from "../components/Menu";
import styles from "./Admin.module.css";

const Admin = () => {
  // react hooks met een waarde en methode om deze aan te passen.
  const initialState = "";
  const [selectedOption, setSelectedOption] = useState(initialState);

  const handleSubmitForm = e => {
    // Het antwoord wordt uit de state gehaald.
    e.preventDefault();
    console.log(selectedOption);
  };

  const handleChangeOption = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    setSelectedOption(e.currentTarget.value);
  };

  return (
    <>
      <Menu />
      <p className={styles.title}>Admin container</p>
      <form action="" onSubmit={handleSubmitForm}>
        <input
          type="radio"
          name="naam"
          value="slider"
          checked={selectedOption === "slider"}
          onChange={handleChangeOption}
          required
        />{" "}
        {"slider"}
        <input
          type="radio"
          name="naam"
          value="tekst"
          checked={selectedOption === "tekst"}
          onChange={handleChangeOption}
          required
        />{" "}
        {"tekst"}
        <input
          type="radio"
          name="naam"
          value="2 opties"
          checked={selectedOption === "2 opties"}
          onChange={handleChangeOption}
          required
        />{" "}
        {"2 opties"}
        <input
          type="radio"
          name="naam"
          value="4 opties"
          checked={selectedOption === "4 opties"}
          onChange={handleChangeOption}
          required
        />{" "}
        {"4 opties"}
        <input
          type="radio"
          name="naam"
          value="8 opties"
          checked={selectedOption === "8 opties"}
          onChange={handleChangeOption}
          required
        />{" "}
        {"8 opties"}
        <input type="submit" value="Stel vraag" />
      </form>
    </>
  );
};

export default Admin;
