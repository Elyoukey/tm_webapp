import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

import home from "./images/Home.png";

class PageAdvancedGame extends Component {
  buttonNames = [
    ["COMPETITIVE", "SOLO"],
    ["CLASSIC", "EXTREME", "NIGHTMARE"],
    ["EASY", "MEDIUM", "HARD"],
    ["V4", "V5", "V6"]
  ];

  render() {
    return (
      <div className="mainTab">
        <h2>{traduction[this.props.language]["PLAYAGAME"]}</h2>

        <label class="label">
          {traduction[this.props.language]["GAMETYPE"]}
        </label>
        <div className="radioGroup">
          <input
              type="button"
              className={ this.props.advancedSettings[0] === 0
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["COMPETITIVE"]}
              onClick={() => this.props.clickAdvanced(0, 0)}
           />
          <input
              type="button"
              className={ this.props.advancedSettings[0] === 1
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["SOLO"]}
              onClick={() => this.props.clickAdvanced(0, 1)}
           />
        </div>

        <label class="label">
          {traduction[this.props.language]["STEP1"]}
        </label>
        <div className="radioGroup">
          <input
              type="button"
              className={ this.props.advancedSettings[1] === 0
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["CLASSIC"]}
              onClick={() => this.props.clickAdvanced(1, 0)}
          />
          <input
              type="button"
              className={ this.props.advancedSettings[1] === 1
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["EXTREME"]}
              onClick={() => this.props.clickAdvanced(1, 1)}
          />
          <input
              type="button"
              className={ this.props.advancedSettings[1] === 2
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["NIGHTMARE"]}
              onClick={() => this.props.clickAdvanced(1, 2)}
          />
        </div>


        <label class="label">
          {traduction[this.props.language]["STEP2"]}
        </label>
        <div className="radioGroup">
          <input
              type="button"
              className={ this.props.advancedSettings[2] === 0
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["EASY"]}
              onClick={() => this.props.clickAdvanced(2, 0)}
          />
          <input
              type="button"
              className={ this.props.advancedSettings[2] === 1
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["MEDIUM"]}
              onClick={() => this.props.clickAdvanced(2, 1)}
          />
          <input
              type="button"
              className={ this.props.advancedSettings[2] === 2
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["HARD"]}
              onClick={() => this.props.clickAdvanced(2, 2)}
          />
        </div>

        <label class="label">
          {traduction[this.props.language]["STEP3"]}
        </label>
        <div className="radioGroup">
          <input
              type="button"
              className={ this.props.advancedSettings[3] === 0
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["V4"]}
              onClick={() => this.props.clickAdvanced(3, 0)}
          />
          <input
              type="button"
              className={ this.props.advancedSettings[3] === 1
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["V5"]}
              onClick={() => this.props.clickAdvanced(3, 1)}
          />
          <input
              type="button"
              className={ this.props.advancedSettings[3] === 2
                  ? "active"
                  : "inactive"
              }
              value={traduction[this.props.language]["V6"]}
              onClick={() => this.props.clickAdvanced(3, 2)}
          />
        </div>


        <input
            className="fullgreen"
            type="button"
            value={traduction[this.props.language]["PLAY"]}
            onClick={() => this.props.playAdvanced()}
        />

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

export default PageAdvancedGame;
