import React from "react";
import Menu from "../components/Menu";
import styles from "./Player.module.css";

const Player = () => {
  return (
    <>
      <Menu />
      <p className={styles.title}>Player container</p>
    </>
  );
};

export default Player;
