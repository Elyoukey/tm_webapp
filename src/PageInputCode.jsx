import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageInputCode extends Component {
  render() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              {this.props.wrongCode ? (
                <span>{traduction[this.props.language]["FALSECODE"]}</span>
              ) : (
                <span>&nbsp;</span>
              )}
              <br />
              <input
                autoFocus
                className="code"
                type="text"
                defaultValue=""
                placeholder={traduction[this.props.language]["INPUTCODE"]}
                size="15"
                onChange={(e) => this.props.handleChangeCode(e.target.value)}
              />
              <br />
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["TESTCODE"]}
                onClick={() => this.props.testCode()}
              />
              &nbsp;
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["CANCEL"]}
                onClick={() => this.props.changePage(idPage["P_INGAME"])}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PageInputCode;
