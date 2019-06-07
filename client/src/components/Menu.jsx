import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants";

const Menu = () => {
  return (
    <div>
      <NavLink to={ROUTES.home}>Home link</NavLink>
      <NavLink to={ROUTES.admin}>Admin link</NavLink>
      <NavLink to={ROUTES.projectie}>Projectie link</NavLink>
      <NavLink to={ROUTES.player}>Player link</NavLink>
    </div>
  );
};

export default withRouter(Menu);
