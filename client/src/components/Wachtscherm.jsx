import React from "react";
import meldingStyles from "../styles/melding.module.css";

const Wachtscherm = () => {
  return (
    <p className={meldingStyles.player_melding}>
      De gamemaster zal dadelijk de volgende vraag stellen...
    </p>
  );
};

export default Wachtscherm;
