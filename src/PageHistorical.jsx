import { Component } from "react";
import "./styles.css";

import idPage from "./idPage";

import home from "./images/Home.png";
import traduction from "./traduction";

class PageHistorical extends Component {
  render() {
    return (

      <div className="mainTab">
        <h2>{traduction[this.props.language]["GAMEHISTORY"]}</h2>

          {this.props.historicalGames.map((hash) => (
            <div key={"#" + hash}>
              <input
                className="button grey"
                type="button"
                value={"#" + hash}
                onClick={() => this.props.loadHistoricalGame("h=" + hash)}
              />
            </div>
          ))}

        <div className="footer">
          <a
              id="homeBut"
              className="backlink"
              type="submit"
              onClick={() => this.props.changePage(idPage["P_MAIN"])}
          >
            {traduction[this.props.language]["BACKHOME"]}
          </a>
        </div>
      </div>
    );
  }
}

export default PageHistorical;
