import React from "react";
import meldingStyles from "../styles/melding.module.css";

const Wachtscherm = () => {
  return (
    <div className={meldingStyles.player_melding_wrapper}>
      <div className={meldingStyles.bolletje_wrapper}>
        <div className={meldingStyles.bolletje} />
        <div className={meldingStyles.bolletje} />
        <div className={meldingStyles.bolletje} />
      </div>
      <p className={meldingStyles.player_melding}>Even geduld</p>
    </div>
  );
};

export default Wachtscherm;
