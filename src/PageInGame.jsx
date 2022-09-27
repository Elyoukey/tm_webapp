import { Component } from "react";
import "./styles.css";

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
    return (
      <table className="mainTab">
        {this.props.landscapeMode
          ? this.renderLandscapeGame()
          : this.renderPortraitGame()}
      </table>
    );
  }

  renderLandscapeGame() {
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
              <img src={home} width="20" height="auto" alt="home" />
            </button>
            {this.props.dailyText != "" ? (
              <span>{this.props.dailyText}&nbsp;</span>
            ) : null}
            {"#" + this.props.game.hash}
            <img
              src={this.props.actualClipboard}
              width="30"
              height="auto"
              alt="copy"
              onClick={() => this.props.copyToClipboard()}
            />
            {this.props.soloPlay ? (
              <span>&nbsp;{traduction[this.props.language]["SOLOMODE"]}</span>
            ) : null}
          </td>
        </tr>
        <tr>
          <td id="spotLeft">A</td>
          <td id="spotLeft">B</td>
          <td id="spotLeft">C</td>
          <td>D</td>
          {this.props.game.n > 4 ? <td id="spotRight">E</td> : null}
          {this.props.game.n > 5 ? <td id="spotRight">F</td> : null}
        </tr>
        {this.props.game.m == 0 ? (
          <tr>
            <td colSpan="4" align="left">
              {traduction[this.props.language]["CRITERIA"]} :
            </td>
            {this.props.game.n > 4 ? <td></td> : null}
            {this.props.game.n > 5 ? <td></td> : null}
          </tr>
        ) : null}
        {this.props.game.m == 1 ? (
          <tr>
            <td colSpan="4" align="left">
              {traduction[this.props.language]["CRITERIADOUBLE"]} :
            </td>
            {this.props.game.n > 4 ? <td></td> : null}
            {this.props.game.n > 5 ? <td></td> : null}
          </tr>
        ) : null}
        {this.props.game.m != 2 ? (
          <tr>
            <td id="spotLeft">
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[0]}
              />
            </td>
            <td id="spotLeft">
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[1]}
              />
            </td>
            <td id="spotLeft">
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[2]}
              />
            </td>
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[3]}
              />
            </td>
            {this.props.game.n > 4 ? (
              <td id="spotRight">
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.ind[4]}
                />
              </td>
            ) : null}
            {this.props.game.n > 5 ? (
              <td id="spotRight">
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.ind[5]}
                />
              </td>
            ) : null}
          </tr>
        ) : null}
        {this.props.game.m == 1 ? (
          <tr>
            <td id="spotLeft">
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[0]}
              />
            </td>
            <td id="spotLeft">
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[1]}
              />
            </td>
            <td id="spotLeft">
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[2]}
              />
            </td>
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[3]}
              />
            </td>
            {this.props.game.n > 4 ? (
              <td id="spotRight">
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.fake[4]}
                />
              </td>
            ) : null}
            {this.props.game.n > 5 ? (
              <td id="spotRight">
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.fake[5]}
                />
              </td>
            ) : null}
          </tr>
        ) : null}
        <tr>
          <td colSpan="4" align="left">
            {traduction[this.props.language]["VERIFIER"]} :
          </td>
          {this.props.game.n > 4 ? <td></td> : null}
          {this.props.game.n > 5 ? <td></td> : null}
        </tr>

        <tr id={"color" + this.props.game.color}>
          <td id="spotLeft">
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[0]}
          </td>
          <td id="spotLeft">
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[1]}
          </td>
          <td id="spotLeft">
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[2]}
          </td>
          <td>
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[3]}
          </td>
          {this.props.game.n > 4 ? (
            <td id="spotRight">
              <img
                src={imgSymb[this.props.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.props.game.crypt[4]}
            </td>
          ) : null}
          {this.props.game.n > 5 ? (
            <td id="spotLeft">
              <img
                src={imgSymb[this.props.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.props.game.crypt[5]}
            </td>
          ) : null}
        </tr>
        {this.props.game.m == 2 ? (
          <tr>
            <td colSpan="4" align="left">
              {traduction[this.props.language]["CRITERIAMIXED"]} :
            </td>
            {this.props.game.n > 4 ? <td></td> : null}
            {this.props.game.n > 5 ? <td></td> : null}
          </tr>
        ) : null}
        {this.props.game.m == 2 ? (
          <tr>
            <td colSpan={this.props.game.n}>
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[0]}
              />{" "}
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[1]}
              />{" "}
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[2]}
              />{" "}
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[3]}
              />{" "}
              {this.props.game.n > 4 ? (
                <input
                  className="indS"
                  type="button"
                  value={this.props.game.sortedInd[4]}
                />
              ) : null}{" "}
              {this.props.game.n > 5 ? (
                <input
                  className="indS"
                  type="button"
                  value={this.props.game.sortedInd[5]}
                />
              ) : null}
            </td>
          </tr>
        ) : null}
        {this.props.page === idPage["P_INGAME"] ? (
          <tr>
            <td colSpan={this.props.game.n}>
              {this.props.soloPlay ? (
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.props.language]["CHECKCODESOLO"]}
                  onClick={() =>
                    this.props.changePage(idPage["P_ASKSOLOPAGE1"])
                  }
                />
              ) : (
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.props.language]["CHECKCODE"]}
                  onClick={() => this.props.changePage(idPage["P_TESTCODE"])}
                />
              )}
              &nbsp;&nbsp;
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["SOLUTION"]}
                onClick={() => this.props.changePage(idPage["P_SHOWQUESTION"])}
              />
            </td>
          </tr>
        ) : null}
        {this.props.page === idPage["P_SHOWQUESTION"] ? (
          <tr>
            <td colSpan={this.props.game.n}>
              <input
                className="smallButtonHelp"
                type="button"
                value={traduction[this.props.language]["SHOW_SOLUTION"]}
              />
              &nbsp;
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["NO"]}
                onClick={() => {
                  this.props.changePage(idPage["P_INGAME"]);
                }}
              />
              &nbsp;
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["YES"]}
                onClick={() => {
                  this.props.changePage(idPage["P_SOLUTION"]);
                }}
              />
            </td>
          </tr>
        ) : null}
      </tbody>
    );
  }

  renderPortraitGame() {
    return (
      <tbody>
        <tr>
          <td
            colSpan={
              this.props.game.m == 1 ? 4 : this.props.game.m == 2 ? 2 : 3
            }
          >
            <button
              id="homeBut"
              className="smallButton"
              type="submit"
              onClick={() => this.props.changePage(idPage["P_MAIN"])}
            >
              <img src={home} width="20" alt="home" />
            </button>
            {this.props.dailyText != "" ? (
              <span>{this.props.dailyText}&nbsp;</span>
            ) : null}
            {this.props.dailyText != "" ? <br /> : null}
            {"#" + this.props.game.hash}
            <img
              src={this.props.actualClipboard}
              width="30"
              height="auto"
              alt="copy"
              onClick={() => this.props.copyToClipboard()}
            />
            {this.props.soloPlay ? (
              <span>
                <br />
                {traduction[this.props.language]["SOLOMODE"]}
              </span>
            ) : null}
          </td>
        </tr>
        <tr id="spotTop">
          <td>A</td>
          {this.props.game.m != 2 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[0]}
              />
            </td>
          ) : null}
          {this.props.game.m == 1 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[0]}
              />
            </td>
          ) : null}
          <td id={"color" + this.props.game.color}>
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[0]}
          </td>
        </tr>
        <tr id="spotTop">
          <td>B</td>
          {this.props.game.m != 2 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[1]}
              />
            </td>
          ) : null}
          {this.props.game.m == 1 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[1]}
              />
            </td>
          ) : null}
          <td id={"color" + this.props.game.color}>
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[1]}
          </td>
        </tr>
        <tr id="spotTop">
          <td>C</td>
          {this.props.game.m != 2 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[2]}
              />
            </td>
          ) : null}
          {this.props.game.m == 1 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[2]}
              />
            </td>
          ) : null}
          <td id={"color" + this.props.game.color}>
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[2]}
          </td>
        </tr>
        <tr>
          <td>D</td>
          {this.props.game.m != 2 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.ind[3]}
              />
            </td>
          ) : null}
          {this.props.game.m == 1 ? (
            <td>
              <input
                className="ind"
                type="button"
                value={this.props.game.fake[3]}
              />
            </td>
          ) : null}
          <td id={"color" + this.props.game.color}>
            <img
              src={imgSymb[this.props.game.color]}
              alt="symbol"
              width="20px"
              height="auto"
            />
            {" " + this.props.game.crypt[3]}
          </td>
        </tr>
        {this.props.game.n > 4 ? (
          <tr id="spotBottom">
            <td>E</td>
            {this.props.game.m != 2 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.ind[4]}
                />
              </td>
            ) : null}
            {this.props.game.m == 1 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.fake[4]}
                />
              </td>
            ) : null}
            <td id={"color" + this.props.game.color}>
              <img
                src={imgSymb[this.props.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.props.game.crypt[4]}
            </td>
          </tr>
        ) : null}
        {this.props.game.n > 5 ? (
          <tr id="spotBottom">
            <td>F</td>
            {this.props.game.m != 2 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.ind[5]}
                />
              </td>
            ) : null}
            {this.props.game.m == 1 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.props.game.fake[5]}
                />
              </td>
            ) : null}
            <td id={"color" + this.props.game.color}>
              <img
                src={imgSymb[this.props.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.props.game.crypt[5]}
            </td>
          </tr>
        ) : null}
        {this.props.game.m == 2 ? (
          <tr>
            <td colSpan="2" align="left">
              {traduction[this.props.language]["CRITERIAMIXED"]} :
            </td>
          </tr>
        ) : null}
        {this.props.game.m == 2 ? (
          <tr>
            <td colSpan="2">
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[0]}
              />{" "}
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[1]}
              />{" "}
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[2]}
              />{" "}
              <input
                className="indS"
                type="button"
                value={this.props.game.sortedInd[3]}
              />{" "}
              {this.props.game.n > 4 ? (
                <input
                  className="indS"
                  type="button"
                  value={this.props.game.sortedInd[4]}
                />
              ) : null}{" "}
              {this.props.game.n > 5 ? (
                <input
                  className="indS"
                  type="button"
                  value={this.props.game.sortedInd[5]}
                />
              ) : null}
            </td>
          </tr>
        ) : null}
        {this.props.page === idPage["P_INGAME"] && !this.props.soloPlay ? (
          <tr>
            <td
              colSpan={
                this.props.game.m == 1 ? 4 : this.props.game.m == 2 ? 2 : 3
              }
            >
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["CHECKCODE"]}
                onClick={() => this.props.changePage(idPage["P_TESTCODE"])}
              />
            </td>
          </tr>
        ) : null}
        {this.props.page === idPage["P_INGAME"] && this.props.soloPlay ? (
          <tr>
            <td
              colSpan={
                this.props.game.m == 1 ? 4 : this.props.game.m == 2 ? 2 : 3
              }
            >
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["CHECKCODESOLO"]}
                onClick={() => this.props.changePage(idPage["P_ASKSOLOPAGE1"])}
              />
            </td>
          </tr>
        ) : null}
        {this.props.page === idPage["P_INGAME"] ? (
          <tr>
            <td
              colSpan={
                this.props.game.m == 1 ? 4 : this.props.game.m == 2 ? 2 : 3
              }
            >
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["SOLUTION"]}
                onClick={() => this.props.changePage(idPage["P_SHOWQUESTION"])}
              />
            </td>
          </tr>
        ) : null}
        {this.props.page !== idPage["P_INGAME"] ? (
          <tr>
            <td
              colSpan={
                this.props.game.m == 1 ? 4 : this.props.game.m == 2 ? 2 : 3
              }
            >
              <input
                className="smallButtonHelp"
                type="button"
                value={traduction[this.props.language]["SHOW_SOLUTION"]}
              />
            </td>
          </tr>
        ) : null}
        {this.props.page !== idPage["P_INGAME"] ? (
          <tr>
            <td
              colSpan={
                this.props.game.m == 1 ? 4 : this.props.game.m == 2 ? 2 : 3
              }
            >
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["NO"]}
                onClick={() => {
                  this.props.changePage(idPage["P_INGAME"]);
                }}
              />
              &nbsp;
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.props.language]["YES"]}
                onClick={() => {
                  this.props.changePage(idPage["P_SOLUTION"]);
                }}
              />
            </td>
          </tr>
        ) : null}
      </tbody>
    );
  }
}

export default PageInGame;
