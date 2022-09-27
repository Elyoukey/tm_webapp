import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";

class PageAskSolo extends Component {
  render() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              <input
                className="buttonMain"
                type="button"
                value={traduction[this.props.language]["COMPETITIVE"]}
                onClick={() => this.props.goCompetitive()}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                className="buttonMain"
                type="button"
                value={traduction[this.props.language]["SOLO"]}
                onClick={() => this.props.goSolo()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PageAskSolo;
