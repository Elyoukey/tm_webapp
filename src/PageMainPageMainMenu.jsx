import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

import print from "./images/PrintLogo.png";

class PageMainPageMainMenu extends Component {
  render() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              <input
                className="buttonMain1"
                type="button"
                value={traduction[this.props.language]["QUICK"]}
                onClick={() => this.props.quickGame()}
                style={{ fontSize: this.props.sizeFont }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                className="buttonMain2"
                type="button"
                value={traduction[this.props.language]["DAY"]}
                onClick={() => this.props.gameOfTheDay()}
                style={{ fontSize: this.props.sizeFont }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                className="buttonMain3"
                type="button"
                value={traduction[this.props.language]["CUSTOM"]}
                onClick={() => this.props.changePage(idPage["P_ADV"])}
                style={{
                  fontSize: this.props.sizeFont
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button
                className="buttonMain"
                type="button"
                onClick={() =>
                  window.open(
                    "https://randolphca.sharepoint.com/:b:/s/Scorpion/EQVT739hm1VLlPpFw_IfeTsBpsugZ1JLWLvwTqkn5SR5JA?e=PnrGIf",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                style={{ fontSize: this.props.sizeFont }}
              >
                <img
                  style={{ verticalAlign: "middle" }}
                  alt="notesheet"
                  src={print}
                  width="auto"
                  height="25"
                />
                <span style={{ verticalAlign: "middle" }}>
                  &nbsp;
                  {traduction[this.props.language]["SHEET"]}&nbsp;
                </span>
                <img
                  style={{ verticalAlign: "middle" }}
                  alt="notesheet"
                  src={print}
                  width="auto"
                  height="25"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PageMainPageMainMenu;
