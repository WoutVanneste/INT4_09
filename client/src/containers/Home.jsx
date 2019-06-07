import React from "react";
import Menu from "../components/Menu";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Menu />
      <p className={styles.title}>Home container</p>
    </>
  );
};

export default Home;
