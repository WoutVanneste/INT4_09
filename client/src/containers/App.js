import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
// import styles from "./App.module.css";

import Home from "./Home";
import Admin from "./Admin";
import Player from "./Player";
import Projectie from "./Projectie";
import { ROUTES } from "../constants";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route path={ROUTES.home} exact strict component={Home} />
          <Route path={ROUTES.admin} component={Admin} />
          <Route path={ROUTES.player} component={Player} />
          <Route path={ROUTES.projectie} component={Projectie} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
