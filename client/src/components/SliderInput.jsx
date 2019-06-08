import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SliderInput extends Component {
  constructor(props) {
    super(props);
    this.state = { slider: "" };
  }

  handleSubmitForm = e => {
    e.preventDefault();
    // Hieronder halen we de slider uit de state om deze te versturen.
    const slider = this.state.slider;
    console.log(slider);
    this.props.history.push({
      pathname: "/projectie",
      antwoord: this.state.slider
    });
  };

  handleChangeSlider = e => {
    // Elke keer de slider verandert wordt deze aangepast in de state.
    this.setState({ slider: e.currentTarget.value });
  };

  render() {
    return (
      <>
        <p>Slider input</p>
        <form onSubmit={this.handleSubmitForm}>
          <input
            type="range"
            min="0"
            max="100"
            onChange={this.handleChangeSlider}
            value={this.state.slider}
          />
          <input type="submit" value="Antwoorden" />
        </form>
      </>
    );
  }
}

export default withRouter(SliderInput);
