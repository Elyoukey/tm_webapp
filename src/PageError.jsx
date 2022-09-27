import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

import home from "./images/Home.png";

class PageError extends Component {
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
              {traduction[this.props.language]["ERROR_UNABLE"]}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PageError;
