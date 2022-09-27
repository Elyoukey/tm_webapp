import { Component } from "react";
import "./styles.css";

import idPage from "./idPage";

import home from "./images/Home.png";

class PageHistorical extends Component {
  render() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              <button
                id="homeBut"
                className="smallButton"
                type="submit"
                onClick={() => this.props.changePage(idPage["P_MAIN"])}
              >
                <img src={home} width="20" alt="home" />
              </button>
              <div className="scrollmenu">
                {this.props.historicalGames.map((hash) => (
                  <div key={"#" + hash}>
                    <input
                      className="button"
                      type="button"
                      value={"#" + hash}
                      onClick={() => this.props.loadHistoricalGame("h=" + hash)}
                    />
                    <br />
                    &nbsp;
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PageHistorical;
