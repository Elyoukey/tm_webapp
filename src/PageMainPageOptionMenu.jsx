import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";

import langFR from "./images/LangFR.png";
import langEN from "./images/LangEN.png";

const imgLang = [langFR, langEN];

class PageMainPageOptionMenu extends Component {
  render() {
    return (
      <div>
        <input
          className="smallButtonHelp"
          type="button"
          value={traduction[this.props.language]["ABOUT"]}
          onClick={() =>
            window.open(
              traduction[this.props.language]["ABOUTLINK"],
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        &nbsp;
        <button
          className="smallButtonHelp"
          type="submit"
          onClick={() => this.props.swapLanguage()}
        >
          <img src={imgLang[this.props.language]} width="20" alt="language" />
        </button>
      </div>
    );
  }
}

export default PageMainPageOptionMenu;
