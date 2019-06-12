import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { socket } from "../containers/App.js";
import radioStyles from "../styles/radioButtons.module.css";
import buttonStyles from "../styles/buttons.module.css";
import styles from "./form.module.css";

class TweeKeuzeInput extends Component {
  constructor(props) {
    super(props);
    this.state = { huidigAntwoord: "" };
  }

  handleSubmitForm = e => {
    e.preventDefault();

    // Het antwoord wordt uit de state gehaald.
    // this.props.answerStore.addAnswerToDatabase({
    //   question: "dit is de tweede vraag",
    //   answers: [{ answer: this.state.huidigAntwoord }]
    // });
    this.props.verstuurAntwoord({ antwoord: this.state.huidigAntwoord });
  };

  handleChangeRadio = e => {
    // Elke keer het antwoord verandert wordt deze aangepast in de state.
    this.setState({ huidigAntwoord: e.currentTarget.value });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmitForm} className={styles.player_form}>
        <div className={styles.player_input_wrapper}>
          {this.props.question.options.length > 0 ? (
            this.props.question.options.map((question, index) => (
              <label
                htmlFor={index}
                className={radioStyles.radio_label}
                key={index}
              >
                <input
                  id={index}
                  type="radio"
                  name="keuze"
                  value={question}
                  checked={this.state.huidigAntwoord === question}
                  onChange={this.handleChangeRadio}
                  className={radioStyles.radio_input}
                />
                <span className={radioStyles.radio_span}>
                  <svg
                    width="126px"
                    height="126px"
                    viewBox="0 0 126 126"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      id="Design-Copy"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                      opacity="1"
                    >
                      <g
                        id="Input_4_publiek-Copy-18"
                        transform="translate(-475.000000, -465.000000)"
                        fill="#FA1D3B"
                        fill-rule="nonzero"
                      >
                        <g
                          id="thumbs-up-3"
                          transform="translate(283.000000, 391.000000)"
                        >
                          <path
                            d="M314.223938,144.304797 C316.66691,141.136587 318,137 318,131.9472 C318,122.675865 310.107035,114.087932 300.10234,114.087932 L282.838863,114.087932 C284.984801,109.813776 287.931773,104.512178 287.931773,96.9064051 C287.93202,82.5325621 282.197789,74 267.528633,74 C260.147051,74 257.407781,83.3313823 256.004309,90.5443898 C255.165867,94.8537372 254.373691,98.9243738 251.937609,101.360456 C246.13718,107.161131 237.28125,121.249998 231.961195,124.110837 C231.422496,124.337736 230.734172,124.5164 229.98457,124.657904 C228.563871,122.599576 226.190051,121.249998 223.5,121.249998 L199.875,121.249998 C195.525785,121.249998 192,124.775783 192,129.124997 L192,192.124994 C192,196.474209 195.525785,200 199.875,200 L223.5,200 C227.849215,200 231.375,196.474209 231.375,192.124994 L231.375,189.974135 C239.371816,189.974135 256.153441,200.001716 275.045566,199.996548 C276.400313,199.997287 284.310996,200.003931 285.138609,199.996548 C299.727539,200 307.841988,191.164982 307.369488,177.899053 C311.092148,173.53655 312.916195,167.234089 311.854547,161.384933 C314.919891,156.579707 315.576961,149.801301 314.223938,144.304797 Z M200,192 L200,129 L224,129 L224,192 L200,192 Z M304.078745,141.998214 C308.024537,144.858148 308.024537,156.643591 302.694521,159.348595 C306.032755,164.936859 303.028295,172.414723 298.987703,174.570476 C301.035032,187.470625 294.306719,191.906371 284.86353,191.996726 C284.045883,192.004092 275.668203,191.996726 274.80908,191.996726 C256.804784,191.996726 241.544742,181.997024 231,181.997024 L231,131.998512 C240.309136,131.998512 248.850247,115.317446 257.213855,106.999133 C264.75463,99.4994178 262.240956,86.9997284 267.268305,82 C279.836429,82 279.836429,90.7204908 279.836429,96.9996763 C279.836429,107.358344 272.295653,111.999107 272.295653,121.99881 L299.945329,121.99881 C305.556782,121.99881 309.975091,126.998784 310,131.998512 C310.024219,136.99824 308.024537,140.929668 304.078745,141.998214 Z M218,180 C218,183.31375 215.31375,186 212,186 C208.68625,186 206,183.31375 206,180 C206,176.68625 208.68625,174 212,174 C215.31375,174 218,176.68625 218,180 Z"
                            id="Shape"
                            transform="translate(255.000000, 137.000000) scale(1, -1) translate(-255.000000, -137.000000) "
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
              </label>
            ))
          ) : (
            <p>Antwoorden aan het ophalen...</p>
          )}
        </div>
        <input
          className={
            styles.player_submit +
            " " +
            (this.state.huidigAntwoord === ""
              ? buttonStyles.submit_form_empty
              : buttonStyles.submit_form)
          }
          type="submit"
          value="Antwoorden"
          disabled={this.state.huidigAntwoord === "" ? true : false}
        />
      </form>
    );
  }
}

export default inject(`answerStore`)(observer(TweeKeuzeInput));
