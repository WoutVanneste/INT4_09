import React from "react";
import Menu from "../components/Menu";
import styles from "./Projectie.module.css";

const Projectie = antwoordPlayer => {
  const antwoord = antwoordPlayer.location.antwoord;
  return (
    <>
      <Menu />
      <p className={styles.title}>Projectie container</p>
      <p>Het antwoord van de speler was: {antwoord}</p>
    </>
  );
};

export default Projectie;
