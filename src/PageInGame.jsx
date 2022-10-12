import { Component } from "react";
import "./styles.css";
import "./css/PageInGame.css";

import CriteriaDisplay from "./criteriaDisplay";
import traduction from "./traduction";
import idPage from "./idPage";

import home from "./images/Home.png";
import symb0 from "./images/Symb0.png";
import symb1 from "./images/Symb1.png";
import symb2 from "./images/Symb2.png";
import symb3 from "./images/Symb3.png";

const imgSymb = [symb0, symb1, symb2, symb3];

class PageInGame extends Component {
  render() {
      let game = this.props.game;
      let rows = [];
      for(let i=0;i<this.props.game.n;i++){
          rows.push(String.fromCharCode(97+i));
      }

    return (
      <div className="mainTab">

          <h2>
              {this.props.dailyText != "" ? (
                  <span>{this.props.dailyText}&nbsp;</span>
              ) : null}
              {"#" + this.props.game.hash}
              <input
                  type="button"
                  value="copy"
                  className="fullblack copy inline"
                  onClick={() => this.props.copyToClipboard()}
              />
          </h2>
          {this.props.soloPlay ? (
              <p>&nbsp;{traduction[this.props.language]["SOLOMODE"]}</p>
          ) : null}
          <p
              dangerouslySetInnerHTML={{ __html: traduction[this.props.language]["TEXT1"] }}>
          </p>

          {game.m === "2" ? (
              <div className="mixedcriteria">
                  <p>
                      {rows.map(function(letter,index){
                          return (
                              <span className="square green">
                            {game.sortedInd[index]}
                          </span>
                          );
                      })}
                  </p>
              </div>
          ):null}

          {rows.map(function(letter,index){
              return (
              <div className="row" key={index}>
                <div className=" cell spot">{letter}</div>
                <div className="cell">
                    <CriteriaDisplay
                        game = {game}
                        row = {index}
                    >
                    </CriteriaDisplay>
                </div>
                  <div className="cell">
                          <span className={"crypt color"+game.color}>{game.crypt[index]}</span>
                  </div>

              </div>
              );
          })}




          <div class="actions">
              <input
                  className="fullgreen"
                  type="button"
                  value={traduction[this.props.language]["CHECKCODE"]}
                  onClick={() => this.props.changePage(idPage["P_TESTCODE"])}
              />
              <input
                  className=""
                  type="button"
                  value={traduction[this.props.language]["SOLUTION"]}
                  onClick={() => this.props.changePage(idPage["P_AREYOUSURE"])}
              />

          </div>

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

export default PageInGame;
