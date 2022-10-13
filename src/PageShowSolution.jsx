import { Component } from "react";
import "./styles.css";
import "./css/PageShowSolution.css";

import traduction from "./traduction";
import idPage from "./idPage";
import config from "./config";

import home from "./images/Home.png";
import noteBox from "./images/NoteBox.jpg";
import noteBoxYES from "./images/NoteBoxYES.jpg";
import noteBoxNO from "./images/NoteBoxNO.jpg";
import CriteriaDisplay from "./criteriaDisplay";

class PageShowSolution extends Component {
  render() {
      // config
      let folderImagesLaws = config['FOLDER_IMAGES_LAWS'];

      //code solution
      let codeArr =  this.props.game.code.toString().split("");
      // game
      let game = this.props.game;

      // letter listing
      let rows = [];
      for(let i=0;i<this.props.game.n;i++){
          rows.push(String.fromCharCode(97+i));
      }

    return (
      <div className="mainTab showSolution">
          <h2>{traduction[this.props.language]["SOLUTION"]}</h2>
            <div className="content">

                <span className="bigSquare codeButtonColor0 active">{codeArr[0]}</span>
                <span className="bigSquare codeButtonColor1 active">{codeArr[1]}</span>
                <span className="bigSquare codeButtonColor2 active">{codeArr[2]}</span>



                <div className="verificatorList">
                    {rows.map(function(letter,index){
                        return (
                            <div key={index} className="row" >
                                <div className="cell first">
                                    <span className="spot">
                                        {letter}
                                    </span>
                                </div>
                                <div className="cell">
                                    <img
                                        src={folderImagesLaws +
                                                game.law[index] +
                                                "_Mini_FR.jpg"
                                        }
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="footer">
                    <a
                        id="homeBut"
                        className="backlink"
                        type="submit"
                        onClick={() => this.props.changePage(idPage["P_INGAME"])}
                    >
                        {traduction[this.props.language]["BACKTOGAME"]}
                    </a>
                </div>
            </div>


      </div>
    );
  }

  renderLandscapeSolution() {
    return (
      <tbody>
        <tr>
          <td colSpan={this.props.game.n}>
            <button
              id="homeBut"
              className="smallButton"
              type="submit"
              onClick={() => this.props.changePage(idPage["P_MAIN"])}
            >
              <img src={home} width="20" alt="home" />
            </button>
            {"#" + this.props.game.hash}
            <img
              src={this.props.actualClipboard}
              width="30"
              height="auto"
              alt="copy"
              onClick={() => this.props.copyToClipboard()}
            />
          </td>
        </tr>
        {this.props.correctCode && !this.props.soloPlay ? (
          <tr>
            <td colSpan={this.props.game.n}>
              {traduction[this.props.language]["YOUWIN"]}
            </td>
          </tr>
        ) : null}
        {this.props.correctCode && this.props.soloPlay ? (
          <tr>
            <td colSpan={this.props.game.n}>{this.displaySocialShare()}</td>
          </tr>
        ) : null}
        {this.props.correctCode &&
        this.props.soloPlay &&
        this.props.winSolo === 0 ? (
          <tr>
            <td colSpan={this.props.game.n}>
              {traduction[this.props.language]["WINSOLO0"]}
            </td>
          </tr>
        ) : null}
        {this.props.correctCode &&
        this.props.soloPlay &&
        this.props.winSolo === 1 ? (
          <tr>
            <td colSpan={this.props.game.n}>
              {traduction[this.props.language]["WINSOLO1"]}
            </td>
          </tr>
        ) : null}
        {this.props.correctCode &&
        this.props.soloPlay &&
        this.props.winSolo === 2 ? (
          <tr>
            <td colSpan={this.props.game.n}>
              {traduction[this.props.language]["WINSOLO2"]}
            </td>
          </tr>
        ) : null}
        {this.props.soloPlay ? (
          <tr>
            <td colSpan={this.props.game.n}>
              MACHINE : {Math.ceil(this.props.game.par / 3)} ROUNDS /{" "}
              {this.props.game.par} QUESTIONS
            </td>
          </tr>
        ) : null}
        <tr>
          <td colSpan={this.props.game.n}>
            {traduction[this.props.language]["CODE"] +
              " : " +
              this.props.game.code}
          </td>
        </tr>
        <tr>
          <td>A</td>
          <td>B</td>
          <td>C</td>
          <td>D</td>
          {this.props.game.n > 4 ? <td>E</td> : null}
          {this.props.game.n > 5 ? <td>F</td> : null}
        </tr>
        <tr>
          <td>
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[0] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
          <td>
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[1] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
          <td>
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[2] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
          <td>
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[3] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
          {this.props.game.n > 4 ? (
            <td>
              <button
                id="solBut"
                className="solButton"
                type="submit"
                style={{
                  backgroundImage:
                    "url('https://www.pcspace.com/tl/img/laws/" +
                    this.props.game.law[4] +
                    "_Mini.jpg')"
                }}
              ></button>
            </td>
          ) : null}
          {this.props.game.n > 5 ? (
            <td>
              <button
                id="solBut"
                className="solButton"
                type="submit"
                style={{
                  backgroundImage:
                    "url('https://www.pcspace.com/tl/img/laws/" +
                    this.props.game.law[5] +
                    "_Mini.jpg')"
                }}
              ></button>
            </td>
          ) : null}
        </tr>
        <tr>
          <td colSpan={this.props.game.n}>
            <input
              className="smallButton"
              type="button"
              value={traduction[this.props.language]["BACK"]}
              onClick={() => this.props.changePage(idPage["P_INGAME"])}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  renderPortraitSolution() {
    return (
      <tbody>
        <tr>
          <td colSpan="3">
            <button
              id="homeBut"
              className="smallButton"
              type="submit"
              onClick={() => this.props.changePage(idPage["P_MAIN"])}
            >
              <img src={home} width="20" alt="home" />
            </button>
            {"#" + this.props.game.hash}
            <img
              src={this.props.actualClipboard}
              width="30"
              height="auto"
              alt="copy"
              onClick={() => this.props.copyToClipboard()}
            />
          </td>
        </tr>
        {this.props.correctCode && !this.props.soloPlay ? (
          <tr>
            <td colSpan="3">{traduction[this.props.language]["YOUWIN"]}</td>
          </tr>
        ) : null}
        {this.props.correctCode && this.props.soloPlay ? (
          <tr>
            <td colSpan="3">{this.displaySocialShare()}</td>
          </tr>
        ) : null}
        {this.props.correctCode &&
        this.props.soloPlay &&
        this.props.winSolo === 0 ? (
          <tr>
            <td colSpan="3">{traduction[this.props.language]["WINSOLO0"]}</td>
          </tr>
        ) : null}
        {this.props.correctCode &&
        this.props.soloPlay &&
        this.props.winSolo === 1 ? (
          <tr>
            <td colSpan="3">{traduction[this.props.language]["WINSOLO1"]}</td>
          </tr>
        ) : null}
        {this.props.correctCode &&
        this.props.soloPlay &&
        this.props.winSolo === 2 ? (
          <tr>
            <td colSpan="3">{traduction[this.props.language]["WINSOLO2"]}</td>
          </tr>
        ) : null}
        {this.props.soloPlay ? (
          <tr>
            <td colSpan="3">
              MACHINE : {Math.ceil(this.props.game.par / 3)} ROUNDS /{" "}
              {this.props.game.par} QUESTIONS
            </td>
          </tr>
        ) : null}
        <tr>
          <td colSpan="3">
            {traduction[this.props.language]["CODE"] +
              " : " +
              this.props.game.code}
          </td>
        </tr>
        <tr>
          <td>A</td>
          <td colSpan="2">
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[0] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
        </tr>
        <tr>
          <td>B</td>
          <td colSpan="2">
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[1] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
        </tr>
        <tr>
          <td>C</td>
          <td colSpan="2">
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[2] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
        </tr>
        <tr>
          <td>D</td>
          <td colSpan="2">
            <button
              id="solBut"
              className="solButton"
              type="submit"
              style={{
                backgroundImage:
                  "url('https://www.pcspace.com/tl/img/laws/" +
                  this.props.game.law[3] +
                  "_Mini.jpg')"
              }}
            ></button>
          </td>
        </tr>
        {this.props.game.n > 4 ? (
          <tr>
            <td>E</td>
            <td colSpan="2">
              <button
                id="solBut"
                className="solButton"
                type="submit"
                style={{
                  backgroundImage:
                    "url('https://www.pcspace.com/tl/img/laws/" +
                    this.props.game.law[4] +
                    "_Mini.jpg')"
                }}
              ></button>
            </td>
          </tr>
        ) : null}
        {this.props.game.n > 5 ? (
          <tr>
            <td>F</td>
            <td colSpan="2">
              <button
                id="solBut"
                className="solButton"
                type="submit"
                style={{
                  backgroundImage:
                    "url('https://www.pcspace.com/tl/img/laws/" +
                    this.props.game.law[5] +
                    "_Mini.jpg')"
                }}
              ></button>
            </td>
          </tr>
        ) : null}
        <tr>
          <td colSpan="3">
            <input
              className="smallButton"
              type="button"
              value={traduction[this.props.language]["BACK"]}
              onClick={() => this.props.changePage(idPage["P_INGAME"])}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  displaySocialShare() {
    return (
      <table style={{ marginLeft: "auto", marginRight: "auto" }}>
        <tbody>
          <tr>
            <td colSpan={this.props.game.n}>
              <span class="emoji">&#128126;</span>TURING MACHINE
              <span class="emoji">&#128126;</span>
              {this.props.dailyText !== "" ? (
                <span>
                  <br />
                  DAILY CHALLENGE
                  <br />
                  {this.props.dailyText}
                </span>
              ) : null}
              <br />
              {"#" + this.props.game.hash}
            </td>
          </tr>
          {this.props.finalTab.map((round, idRound) => (
            <tr>
              {round.map((question, idQuestion) => (
                <td>
                  {question === 0 ? <img src={noteBox} alt="empty" /> : null}
                  {question === 1 ? <img src={noteBoxYES} alt="yes" /> : null}
                  {question === 2 ? <img src={noteBoxNO} alt="no" /> : null}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={this.props.game.n}>
              {this.props.winSolo === 0
                ? traduction[this.props.language]["SOCIALLOSE"]
                : null}
              {this.props.winSolo === 1
                ? traduction[this.props.language]["SOCIALWIN"]
                : null}
              {this.props.winSolo === 2
                ? traduction[this.props.language]["SOCIALWIN"]
                : null}
            </td>
          </tr>
          <tr>
            <td colSpan={this.props.game.n}>
              <img
                src={this.props.actualCopySocialImg}
                width="50"
                height="auto"
                alt="copy"
                onClick={() => this.props.copySocialTXTToClipboard()}
              />
                <img
                src={this.props.actualCopySocialImg}
                width="50"
                height="auto"
                alt="copy"
                onClick={() => this.props.copySocialTXTToClipboard()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PageShowSolution;
