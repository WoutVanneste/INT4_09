import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
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
      endpoint: "http://localhost:4000/"
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
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
export { socket };
