import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class TekstInput extends Component {
  constructor(props) {
    super(props);
    this.state = { tekst: "" };
  }

  handleSubmitForm = e => {
    e.preventDefault();
    // Hieronder halen we de tekst uit de state om deze te versturen.
    const tekst = this.state.tekst;
    console.log(tekst);
    this.props.history.push({
      pathname: "/projectie",
      antwoord: this.state.tekst
    });
  };

  handleChangeTekst = e => {
    // Elke keer de tekst verandert wordt deze aangepast in de state.
    this.setState({ tekst: e.currentTarget.value });
  };

  render() {
    return (
      <>
        <p>Tekstinput</p>
        <form onSubmit={this.handleSubmitForm}>
          <input
            type="text"
            onChange={this.handleChangeTekst}
            value={this.state.tekst}
          />
          <input type="submit" value="Antwoorden" />
        </form>
      </>
    );
  }
}

export default withRouter(TekstInput);
