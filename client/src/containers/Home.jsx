import React from "react";
import styles from "./Home.module.css";
import { inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import { ROUTES } from "../constants";

const Home = ({ questionStore, history }) => {
  const handleTaalkeuze = e => {
    let taal = "";
    switch (e.currentTarget.textContent) {
      case "Nederlands":
        taal = "nl";
        break;
      case "Français":
        taal = "fr";
        break;
      case "English":
        taal = "en";
        break;
      default:
        taal = "nl";
        break;
    }
    // questionStore.setLanguage(taal);
    // history.push(ROUTES.player);
  };
  return (
    <>
      <h1 className={styles.title}>Selecteer jouw taal</h1>
      <div className={styles.taal_wrapper}>
        <Link
          className={styles.link}
          to={{
            pathname: ROUTES.player,
            state: {
              taal: "nl"
            }
          }}
        >
          Nederlands
        </Link>
        <Link
          className={styles.link}
          to={{
            pathname: ROUTES.player,
            state: {
              taal: "fr"
            }
          }}
        >
          Fran&ccedil;ais
        </Link>
        <Link
          className={styles.link}
          to={{
            pathname: ROUTES.player,
            state: {
              taal: "en"
            }
          }}
        >
          English
        </Link>
      </div>
    </>
  );
};

export default inject(`questionStore`)(withRouter(Home));
