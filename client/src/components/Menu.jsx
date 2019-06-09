import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.navigatie}>
      <NavLink to={ROUTES.home} className={styles.link}>
        Home link
      </NavLink>
      <NavLink to={ROUTES.admin} className={styles.link}>
        Admin link
      </NavLink>
      <NavLink to={ROUTES.projectie} className={styles.link}>
        Projectie link
      </NavLink>
      <NavLink to={ROUTES.player} className={styles.link}>
        Player link
      </NavLink>
    </div>
  );
};

export default withRouter(Menu);
