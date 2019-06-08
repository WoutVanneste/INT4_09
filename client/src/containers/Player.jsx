import React from "react";
import Menu from "../components/Menu";
import TweeKeuzeInput from "../components/TweeKeuzeInput";
import VierKeuzeInput from "../components/VierKeuzeInput";
import AchtKeuzeInput from "../components/AchtKeuzeInput";
import TekstInput from "../components/TekstInput";
import SliderInput from "../components/SliderInput";
import styles from "./Player.module.css";

const Player = vraag => {
  //via vraag.location.vraag kunnen we de data die we meegaven vanuit de admin opvragen, zo weten we hoeveel opties er zijn voor de vraag.
  const aantalKeuzes = vraag.location.vraag;

  //op basis van het aantal opties wordt een andere component getoond met het juiste aantal opties.
  //als er niks is meegegeven, komt er een empty state melding.
  const keuzeSwitch = () => {
    switch (aantalKeuzes) {
      case "2":
        return <TweeKeuzeInput />;
      case "4":
        return <VierKeuzeInput />;
      case "8":
        return <AchtKeuzeInput />;
      case "tekst":
        return <TekstInput />;
      case "slider":
        return <SliderInput />;
      default:
        return <p>De gamemaster heeft nog geen vraag doorgestuurd</p>;
    }
  };
  return (
    <>
      <Menu />
      <p className={styles.title}>Player container</p>
      {keuzeSwitch()}
    </>
  );
};

export default Player;
