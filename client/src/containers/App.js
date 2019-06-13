import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";

import styles from "./App.module.css";

// import Home from "./Home";
import Admin from "./Admin";
import Player from "./Player";
import Projectie from "./Projectie";
import { ROUTES } from "../constants";

var socket;
class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "/"
    };

    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (
      <main className={styles.layout}>
        <Switch>
          <Route path={ROUTES.home} exact strict component={Player} />{" "}
          {/* ga direct naar de player pagina via home */}
          <Route path={ROUTES.admin} component={Admin} />
          <Route path={ROUTES.player} component={Player} />
          <Route path={ROUTES.projectie} component={Projectie} />
          {/* redirect naar de playerpagina indien de pagina niet bestaat */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
export { socket };
