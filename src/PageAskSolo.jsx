import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageAskSolo extends Component {
  render() {
    return (
      <div className="mainTab">


        <div className="radioGroup">
          <input
              type="button"
              className={ !this.props.soloPlay
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["COMPETITIVE"]}
              onClick={() => this.props.goCompetitive()}
          />
        <input
              type="button"
              className={ this.props.soloPlay
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["SOLO"]}
              onClick={() => this.props.goSolo()}
          />
      </div>
        <input
            className="fullgreen"
            type="button"
            value={traduction[this.props.language]["PLAY"]}
            onClick={() => this.props.changePage(idPage["P_INGAME"])}
        />
      </div>
    );
  }
}

export default PageAskSolo;
