import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageSearch extends Component {
  render() {
    return (
      <div className="mainTab">

        <h2>{traduction[this.props.language]["SEARCH"]}</h2>
        <p>{traduction[this.props.language]["INPUTGAMECODE"]}</p>

<input
    type="text"
    className="bigInput"
    onChange={(e) => this.props.handleChange(e.target.value)}
/>
          <input
              type="button"
              className="fullgreen"
              value={traduction[this.props.language]["LOAD"]}
              onClick={() => this.props.hashGame()}
          />
      </div>
    );
  }
}

export default PageSearch;
