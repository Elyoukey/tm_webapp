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
