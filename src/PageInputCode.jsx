import { Component } from "react";
import "./styles.css";
import "./css/PageInputCode.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageInputCode extends Component {
  render() {

    let buttons = [];

    for(let i=5;i>0;i--){

      for( let j=0; j<3;j++){
        buttons.push(<span className="bigSquare">{i}</span>);
      }
      buttons.push(<br/>);
    }


    return (
      <div className="mainTab">
buttons:
        {buttons}

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

              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["CANCEL"]}
                onClick={() => this.props.changePage(idPage["P_INGAME"])}
              />

      </div>
    );
  }
}

export default PageInputCode;
