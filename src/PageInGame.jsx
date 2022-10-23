import { Component } from "react";
import "./styles.css";
import "./css/PageInGame.css";

import CriteriaDisplay from "./criteriaDisplay";
import traduction from "./traduction";
import idPage from "./idPage";
import CopyButton from "./copyButton";

class PageInGame extends Component {
  render() {
      let game = this.props.game;
      let m = parseInt(this.props.game.m);
      let rows = [];
      for(let i=0;i<this.props.game.n;i++){
          rows.push(String.fromCharCode(97+i));
      }
    return (
      <div className="mainTab pageInGame">

          <div className="solomode">
              {this.props.soloPlay ?
                  (<span>{traduction[this.props.language]["SOLOMODE"]}</span>)
                  :
                  (<span>{traduction[this.props.language]["COMPETITIVE"]}</span>)
              }
          </div>
          <div className="difficulty">
              {this.props.game.m == '1' ? (
                  <span>{traduction[this.props.language]["EXTREMEMODE"]}</span>
              ) : null}
              {this.props.game.m == '2' ? (
                  <span>{traduction[this.props.language]["NIGHTMAREMODE"]}</span>
              ) : null}
              {this.props.dailyText != "" ? (
                  <span>{traduction[this.props.language]["DAiLYCHALLENGE"]} {this.props.dailyText}</span>
              ) : null}


          </div>


          <h2>
              {"#" + this.props.game.hash}
              <CopyButton
                  text = {"#" + this.props.game.hash}
                  language = {this.props.language}
              />
          </h2>


          <p
              dangerouslySetInnerHTML={{ __html: traduction[this.props.language]["TEXT1"] }}>
          </p>

          {m === 2 ? (
              <div className="mixedcriteria">
                  <p>
                      {rows.map(function(letter,index){
                          return (
                              <span key={index} className="square green">
                                {game.sortedInd[index]}
                              </span>
                          );
                      })}
                  </p>
              </div>
          ):null}

          <div className="table">
              {rows.map(function(letter,index){
                  return (
                  <div key={index} className="row" >
                    <div className=" cell spot">{letter}</div>
                    <div className="cell criteria">
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

          </div>



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
