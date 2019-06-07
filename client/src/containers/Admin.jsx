import React from "react";
import Menu from "../components/Menu";
import styles from "./Admin.module.css";

const Admin = () => {
  return (
    <>
      <Menu />
      <p className={styles.title}>Admin container</p>
    </>
  );
};

export default Admin;
