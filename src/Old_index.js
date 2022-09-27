// CE FICHIER N'EST PLUS UTILE !!!

import React from "react";
import { createRoot } from "react-dom/client";
import Cookies from "universal-cookie";
import Moment from "moment";
import "./styles.css";

import MainMenu from "./MainMenu";
import CustomGame from "./CustomGame";
import SoloPage from "./SoloPage";

import traduction from "./traduction";
import idPage from "./idPage";

import boxFR from "./images/BOX_FR.jpg";
import boxEN from "./images/BOX_EN.jpg";
import logoTM from "./images/Menu.png";
import history from "./images/History.png";
import home from "./images/Home.png";
import langFR from "./images/LangFR.png";
import langEN from "./images/LangEN.png";
import symb0 from "./images/Symb0.png";
import symb1 from "./images/Symb1.png";
import symb2 from "./images/Symb2.png";
import symb3 from "./images/Symb3.png";
import clipboard from "./images/Clipboard.png";
import clipboardOK from "./images/ClipboardOK.png";
import noteBox from "./images/NoteBox.jpg";
import noteBoxYES from "./images/NoteBoxYES.jpg";
import noteBoxNO from "./images/NoteBoxNO.jpg";
import shareImg from "./images/Share.jpg";
import shareImgOK from "./images/ShareOK.jpg";

const imgLang = [langFR, langEN];
const imgBox = [boxFR, boxEN];
const imgSymb = [symb0, symb1, symb2, symb3];
const cookies = new Cookies();

var userID = "";
var historicalGames;

class App extends React.Component {
  state = {
    landscapeMode: true,
    sizeImage: 1,
    sizeFont: 24,
    smallSizeFont: 15,
    page: 0,
    historicalData: false,
    language: 1,
    hashValue: "",
    codeValue: "",
    roundValue: "0",
    questionValue: "0",
    advancedSettings: [0, 0, 1, 1],
    actualClipboard: clipboard,
    wrongCode: false,
    youWin: false,
    winSolo: 0,
    soloPlay: false,
    askSolo: false,
    dailyText: "",
    socialTXT: "",
    finalTab: [],
    actualCopySocialImg: shareImg
  };

  game = {
    idPartie: 0,
    color: 0,
    hash: "",
    m: 0,
    d: 0,
    n: 4,
    code: "111",
    par: 0,
    fake: [0, 0, 0, 0, 0, 0],
    ind: [0, 0, 0, 0, 0, 0],
    law: [0, 0, 0, 0, 0, 0],
    crypt: [0, 0, 0, 0, 0, 0],
    sortedInd: [0, 0, 0, 0, 0, 0]
  };

  componentDidMount() {
    document.title = "Turing Machine";
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    userID = cookies.get("user");
    var hData = cookies.get("histData", { doNotParse: true });
    if (hData === undefined) {
      historicalGames = [];
    } else {
      historicalGames = JSON.parse(hData);
      if (historicalGames.length > 0) {
        this.setState({
          historicalData: true
        });
      }
    }
    if (userID === undefined) {
      userID = this.generateUUID();
    }
    var d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 24 * 400 * 1000);
    cookies.set("user", userID, {
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
      expires: d
    });
  }

  updateHistoricalData() {
    var d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 24 * 400 * 1000);
    cookies.set("histData", JSON.stringify(historicalGames), {
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
      expires: d
    });
    this.setState({
      historicalData: true
    });
  }

  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  swapLanguage() {
    if (this.state.language === 0) {
      this.setState({ language: 1 });
    } else {
      this.setState({ language: 0 });
    }
  }

  resize() {
    var sizex = window.innerWidth;
    var sizey = window.innerHeight;
    if (sizex < sizey) {
      this.setState({
        sizeImage: Math.min(sizex * 0.8, sizey / 2),
        sizeFont: Math.max(sizex * 0.06, 20),
        smallSizeFont: Math.max(sizex * 0.04, 14),
        landscapeMode: sizex < sizey ? false : true
      });
    } else {
      this.setState({
        sizeImage: Math.min(sizex / 2, sizey - 130),
        sizeFont: Math.max(sizex * 0.03, 20),
        smallSizeFont: Math.max(sizex * 0.02, 14),
        landscapeMode: sizex < sizey ? false : true
      });
    }
  }

  copyToClipboard() {
    const el = document.createElement("textarea");
    el.value = "#" + this.game.hash;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({ actualClipboard: clipboardOK });
  }

  copySocialTXTToClipboard() {
    const el = document.createElement("textarea");
    el.value = this.state.socialTXT;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.setState({ actualCopySocialImg: shareImgOK });
  }

  addGame(hash) {
    for (var i = 0; i < historicalGames.length; i++) {
      if (historicalGames[i] === hash) {
        historicalGames.splice(i, 1);
        i--;
      }
    }
    historicalGames = [hash].concat(historicalGames);
    if (historicalGames.length > 100) {
      historicalGames.pop();
    }
    this.updateHistoricalData();
  }

  shuffleIndFake() {
    for (var i = 0; i < this.game.n; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        var n = this.game.ind[i];
        this.game.ind[i] = this.game.fake[i];
        this.game.fake[i] = n;
      }
    }
  }

  sortInd() {
    this.game.sortedInd = [...this.game.ind];
    this.game.sortedInd.sort((a, b) => (a > b ? 1 : -1));
  }

  goCompetitive() {
    this.state.soloPlay = false;
    this.changePage(idPage["P_INGAME"]);
  }

  goSolo() {
    this.state.soloPlay = true;
    this.changePage(idPage["P_INGAME"]);
  }

  loadHistoricalGame(url) {
    this.state.askSolo = true;
    this.loadGame(url);
  }

  loadGame(url) {
    this.changePage(idPage["P_LOADING"]);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
      if (data.length === 0) {
        this.changePage(idPage["P_ERROR"]);
        return;
      }
      var jsonResponse = JSON.parse(data);
      if (jsonResponse["status"] === "ok") {
        this.addGame(jsonResponse["hash"]);
        this.game.idPartie = jsonResponse["idPartie"];
        this.game.color = jsonResponse["color"];
        this.game.hash = jsonResponse["hash"];
        this.game.m = jsonResponse["m"];
        this.game.d = jsonResponse["d"];
        this.game.n = jsonResponse["n"];
        this.game.code = jsonResponse["code"];
        this.game.par = jsonResponse["par"];
        this.game.fake = jsonResponse["fake"];
        this.game.ind = jsonResponse["ind"];
        this.game.law = jsonResponse["law"];
        this.game.crypt = jsonResponse["crypt"];
        if (this.game.m > 0) {
          this.game.par = Math.ceil(this.game.par * 1.5);
        }
        if (this.game.m == 1) {
          this.shuffleIndFake();
        }
        if (this.game.m == 2) {
          this.sortInd();
        }
        if (this.state.dailyText != "") {
          Moment.locale("en");
          this.state.dailyText = Moment.unix(jsonResponse["curDate"]).format(
            traduction[this.state.language]["DATEFORMAT"]
          );
        }
        if (this.state.askSolo) this.changePage(idPage["P_ASKSOLO"]);
        else this.changePage(idPage["P_INGAME"]);
      } else {
        this.changePage(idPage["P_ERROR"]);
      }
    });
    xhr.addEventListener("error", () => {
      this.changePage(idPage["P_ERROR"]);
    });
    xhr.addEventListener("abort", () => {
      this.changePage(idPage["P_ERROR"]);
    });
    xhr.open(
      "GET",
      "https://www.pcspace.com/tl/api.php?uuid=" + userID + "&" + url
    );
    xhr.send();
  }

  setData(win) {
    var solo = "0";
    if (this.state.soloPlay) solo = "1";
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      var data = xhr.responseText;
    });
    xhr.open(
      "GET",
      "https://www.pcspace.com/tl/recordSolo.php?i=" +
        this.game.idPartie +
        "&m=" +
        this.game.m +
        "&r=" +
        this.state.roundValue +
        "&q=" +
        this.state.questionValue +
        "&w=" +
        win +
        "&s=" +
        solo
    );
    xhr.send();
  }

  quickGame() {
    if (this.state.hashValue.length > 0) {
      this.state.askSolo = true;
      this.loadGame("h=" + this.state.hashValue.toUpperCase());
    } else {
      this.loadGame("s=0");
    }
  }

  gameOfTheDay() {
    this.state.askSolo = true;
    let time =
      Math.floor(new Date().getTime() / 1000.0) -
      new Date().getTimezoneOffset() * 60;
    this.state.dailyText = "_";
    this.loadGame("s=1&curDate=" + time);
  }

  hashGame() {
    this.state.askSolo = true;
    this.loadGame("h=" + this.state.hashValue.toUpperCase());
  }

  playAdvanced() {
    this.state.soloPlay = this.state.advancedSettings[0] === 1;
    this.loadGame(
      "m=" +
        this.state.advancedSettings[1] +
        "&d=" +
        this.state.advancedSettings[2] +
        "&n=" +
        (this.state.advancedSettings[3] + 4)
    );
  }

  changePage(newPage) {
    this.setState({
      page: newPage,
      actualClipboard: clipboard,
      hashValue: "",
      codeValue: "",
      roundValue: "0",
      questionValue: "0",
      wrongCode: false,
      youWin: false,
      winSolo: 0,
      actualCopySocialImg: shareImg
    });
    if (newPage === 0) {
      this.state.advancedSettings = [0, 0, 1, 1];
      this.state.soloPlay = false;
      this.state.askSolo = false;
      this.state.dailyText = "";
      this.state.socialTXT = "";
      this.state.finalTab = [];
    }
  }

  handleChange(value) {
    value = value.replace("#", "");
    value = value.replace(" ", "");
    this.setState({ hashValue: value });
  }

  handleChangeCode(value) {
    value = value.replace(" ", "");
    this.setState({ codeValue: value });
  }

  testCode() {
    if (this.state.codeValue == this.game.code) {
      this.changePage(idPage["P_SOLUTION"]);
      this.setState({ youWin: true });
      this.setData(2);
    } else {
      this.setState({ wrongCode: true });
      this.setData(0);
    }
  }

  testCodeSoloVictory(nbRounds, nbQuestions, socialTXT, finalTab) {
    this.state.roundValue = nbRounds;
    this.state.questionValue = nbQuestions;
    this.state.socialTXT = socialTXT;
    this.state.finalTab = finalTab;
    var roundMachine = Math.ceil(this.game.par / 3);
    var win = 0; // 0 : défaite, 1 : tie, 2 : victory
    if (this.state.roundValue < roundMachine) {
      win = 2;
      this.state.socialTXT =
        this.state.socialTXT + traduction[this.state.language]["SOCIALWIN"];
    } else {
      if (this.state.roundValue == roundMachine) {
        if (this.state.questionValue < this.game.par) {
          win = 2;
          this.state.socialTXT =
            this.state.socialTXT + traduction[this.state.language]["SOCIALWIN"];
        }
        if (this.state.questionValue == this.game.par) {
          win = 1;
          this.state.socialTXT =
            this.state.socialTXT + traduction[this.state.language]["SOCIALWIN"];
        }
      }
    }
    if (win === 0) {
      this.state.socialTXT =
        this.state.socialTXT + traduction[this.state.language]["SOCIALLOSE"];
    }
    this.changePage(idPage["P_SOLUTION"]);
    this.setState({ youWin: true, winSolo: win });
    this.setData(win);
  }

  testCodeSolo() {
    if (this.state.codeValue == this.game.code) {
      this.changePage(idPage["P_ASKSOLOPAGE2"]);
    } else {
      this.setState({ wrongCode: true });
    }
  }

  clickAdvanced(column, row) {
    this.state.advancedSettings[column] = row;
    this.forceUpdate();
  }

  render() {
    return <div>{this.getPage()}</div>;
  }

  getPage() {
    if (this.state.page === idPage["P_MAIN"]) {
      return (
        <div className="App">
          {this.state.landscapeMode
            ? this.getLandscapeMainPage()
            : this.getPortraitMainPage()}
        </div>
      );
    }
    if (this.state.page === idPage["P_ADV"]) {
      return (
        <div className="App">
          <CustomGame
            landscapeMode={this.state.landscapeMode}
            language={this.state.language}
            smallSizeFont={this.state.smallSizeFont}
            changePage={(page) => this.changePage(page)}
            advancedSettings={this.state.advancedSettings}
            clickAdvanced={(column, row) => this.clickAdvanced(column, row)}
            playAdvanced={() => this.playAdvanced()}
          />
        </div>
      );
    }
    if (this.state.page === idPage["P_LOADING"]) {
      return (
        <div className="App">
          <table className="mainTab">
            <tbody>
              <tr>
                <td>{traduction[this.state.language]["LOADING"]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    if (
      this.state.page === idPage["P_INGAME"] ||
      this.state.page === idPage["P_SHOWQUESTION"]
    ) {
      return (
        <div className="App">
          {this.state.landscapeMode
            ? this.getLandscapeGame()
            : this.getPortraitGame()}
        </div>
      );
    }
    if (this.state.page === idPage["P_ASKSOLO"]) {
      return <div className="App">{this.getSoloQuestionPage()}</div>;
    }
    if (this.state.page === idPage["P_TESTCODE"]) {
      return <div className="App">{this.getInputCodePage()}</div>;
    }
    if (
      this.state.page === idPage["P_ASKSOLOPAGE1"] ||
      this.state.page === idPage["P_ASKSOLOPAGE2"]
    ) {
      return (
        <div className="App">
          <SoloPage
            page={this.state.page}
            language={this.state.language}
            game={this.game}
            codeValue={this.state.codeValue}
            roundValue={this.state.roundValue}
            questionValue={this.state.questionValue}
            wrongCode={this.state.wrongCode}
            handleChangeCode={(e) => this.handleChangeCode(e)}
            testCodeSolo={() => this.testCodeSolo()}
            testCodeSoloVictory={(nbRounds, nbQuestions, socialTXT, finalTab) =>
              this.testCodeSoloVictory(
                nbRounds,
                nbQuestions,
                socialTXT,
                finalTab
              )
            }
            changePage={(e) => this.changePage(e)}
            dailyText={this.state.dailyText}
          />
        </div>
      );
    }
    if (this.state.page === idPage["P_ERROR"]) {
      return (
        <div className="App">
          <table className="mainTab">
            <tbody>
              <tr>
                <td>
                  <button
                    id="homeBut"
                    className="smallButton"
                    type="submit"
                    onClick={() => this.changePage(idPage["P_MAIN"])}
                  >
                    <img src={home} width="20" alt="home" />
                  </button>
                  {traduction[this.state.language]["ERROR_UNABLE"]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    if (this.state.page === idPage["P_HIST"]) {
      return (
        <div className="App">
          <table className="mainTab">
            <tbody>
              <tr>
                <td>
                  <button
                    id="homeBut"
                    className="smallButton"
                    type="submit"
                    onClick={() => this.changePage(idPage["P_MAIN"])}
                  >
                    <img src={home} width="20" alt="home" />
                  </button>
                  <div className="scrollmenu">{this.getListHistorical()}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    if (this.state.page === idPage["P_ABOUT"]) {
      return (
        <div className="App">
          <table className="mainTab">
            <tbody>
              <tr>
                <td>
                  <button
                    id="homeBut"
                    className="smallButton"
                    type="submit"
                    onClick={() => this.changePage(idPage["P_MAIN"])}
                  >
                    <img src={home} width="20" alt="home" />
                  </button>
                  TURING MACHINE
                  <br />
                  <br />
                  SCORPION MASQUE
                  <br />
                  <br />
                  FABIEN GRIDEL
                  <br />
                  <br />
                  YOANN LEVET
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    if (this.state.page === idPage["P_SOLUTION"]) {
      return (
        <div className="App">
          {this.state.landscapeMode
            ? this.getLandscapeSolution()
            : this.getPortraitSolution()}
        </div>
      );
    }
  }

  getListHistorical() {
    return historicalGames.map((hash) => (
      <div key={"#" + hash}>
        <input
          className="button"
          type="button"
          value={"#" + hash}
          onClick={() => this.loadHistoricalGame("h=" + hash)}
        />
        <br />
        &nbsp;
      </div>
    ));
  }

  getSoloQuestionPage() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              <input
                className="buttonMain"
                type="button"
                value={traduction[this.state.language]["COMPETITIVE"]}
                onClick={() => this.goCompetitive()}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                className="buttonMain"
                type="button"
                value={traduction[this.state.language]["SOLO"]}
                onClick={() => this.goSolo()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getInputCodePage() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              {this.state.wrongCode ? (
                <span>{traduction[this.state.language]["FALSECODE"]}</span>
              ) : (
                <span>&nbsp;</span>
              )}
              <br />
              <input
                autoFocus
                className="code"
                type="text"
                defaultValue=""
                placeholder={traduction[this.state.language]["INPUTCODE"]}
                size="15"
                onChange={(e) => this.handleChangeCode(e.target.value)}
              />
              <br />
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.state.language]["TESTCODE"]}
                onClick={() => this.testCode()}
              />
              &nbsp;
              <input
                className="smallButtonMain"
                type="button"
                value={traduction[this.state.language]["CANCEL"]}
                onClick={() => this.changePage(idPage["P_INGAME"])}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getMainMenu() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              {this.state.page === idPage["P_MAIN"] ? (
                <MainMenu
                  language={this.state.language}
                  quickGame={() => this.quickGame()}
                  gameOfTheDay={() => this.gameOfTheDay()}
                  changePage={(page) => this.changePage(page)}
                  sizeFont={this.state.sizeFont}
                />
              ) : null}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getOptionMenu() {
    return (
      <div>
        <input
          className="smallButtonHelp"
          type="button"
          value={traduction[this.state.language]["ABOUT"]}
          onClick={() =>
            window.open(
              traduction[this.state.language]["ABOUTLINK"],
              "_blank",
              "noopener,noreferrer"
            )
          }
        />
        &nbsp;
        <button
          className="smallButtonHelp"
          type="submit"
          onClick={() => this.swapLanguage()}
        >
          <img src={imgLang[this.state.language]} width="20" alt="language" />
        </button>
      </div>
    );
  }

  getLandscapeGame() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td colSpan={this.game.n}>
              <button
                id="homeBut"
                className="smallButton"
                type="submit"
                onClick={() => this.changePage(idPage["P_MAIN"])}
              >
                <img src={home} width="20" height="auto" alt="home" />
              </button>
              {this.state.dailyText != "" ? (
                <span>{this.state.dailyText}&nbsp;</span>
              ) : null}
              {"#" + this.game.hash}
              <img
                src={this.state.actualClipboard}
                width="30"
                height="auto"
                alt="copy"
                onClick={() => this.copyToClipboard()}
              />
              {this.state.soloPlay ? (
                <span>&nbsp;{traduction[this.state.language]["SOLOMODE"]}</span>
              ) : null}
            </td>
          </tr>
          <tr>
            <td id="spotLeft">A</td>
            <td id="spotLeft">B</td>
            <td id="spotLeft">C</td>
            <td>D</td>
            {this.game.n > 4 ? <td id="spotRight">E</td> : null}
            {this.game.n > 5 ? <td id="spotRight">F</td> : null}
          </tr>
          {this.game.m == 0 ? (
            <tr>
              <td colSpan="4" align="left">
                {traduction[this.state.language]["CRITERIA"]} :
              </td>
              {this.game.n > 4 ? <td></td> : null}
              {this.game.n > 5 ? <td></td> : null}
            </tr>
          ) : null}
          {this.game.m == 1 ? (
            <tr>
              <td colSpan="4" align="left">
                {traduction[this.state.language]["CRITERIADOUBLE"]} :
              </td>
              {this.game.n > 4 ? <td></td> : null}
              {this.game.n > 5 ? <td></td> : null}
            </tr>
          ) : null}
          {this.game.m != 2 ? (
            <tr>
              <td id="spotLeft">
                <input className="ind" type="button" value={this.game.ind[0]} />
              </td>
              <td id="spotLeft">
                <input className="ind" type="button" value={this.game.ind[1]} />
              </td>
              <td id="spotLeft">
                <input className="ind" type="button" value={this.game.ind[2]} />
              </td>
              <td>
                <input className="ind" type="button" value={this.game.ind[3]} />
              </td>
              {this.game.n > 4 ? (
                <td id="spotRight">
                  <input
                    className="ind"
                    type="button"
                    value={this.game.ind[4]}
                  />
                </td>
              ) : null}
              {this.game.n > 5 ? (
                <td id="spotRight">
                  <input
                    className="ind"
                    type="button"
                    value={this.game.ind[5]}
                  />
                </td>
              ) : null}
            </tr>
          ) : null}
          {this.game.m == 1 ? (
            <tr>
              <td id="spotLeft">
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[0]}
                />
              </td>
              <td id="spotLeft">
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[1]}
                />
              </td>
              <td id="spotLeft">
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[2]}
                />
              </td>
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[3]}
                />
              </td>
              {this.game.n > 4 ? (
                <td id="spotRight">
                  <input
                    className="ind"
                    type="button"
                    value={this.game.fake[4]}
                  />
                </td>
              ) : null}
              {this.game.n > 5 ? (
                <td id="spotRight">
                  <input
                    className="ind"
                    type="button"
                    value={this.game.fake[5]}
                  />
                </td>
              ) : null}
            </tr>
          ) : null}
          <tr>
            <td colSpan="4" align="left">
              {traduction[this.state.language]["VERIFIER"]} :
            </td>
            {this.game.n > 4 ? <td></td> : null}
            {this.game.n > 5 ? <td></td> : null}
          </tr>

          <tr id={"color" + this.game.color}>
            <td id="spotLeft">
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[0]}
            </td>
            <td id="spotLeft">
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[1]}
            </td>
            <td id="spotLeft">
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[2]}
            </td>
            <td>
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[3]}
            </td>
            {this.game.n > 4 ? (
              <td id="spotRight">
                <img
                  src={imgSymb[this.game.color]}
                  alt="symbol"
                  width="20px"
                  height="auto"
                />
                {" " + this.game.crypt[4]}
              </td>
            ) : null}
            {this.game.n > 5 ? (
              <td id="spotLeft">
                <img
                  src={imgSymb[this.game.color]}
                  alt="symbol"
                  width="20px"
                  height="auto"
                />
                {" " + this.game.crypt[5]}
              </td>
            ) : null}
          </tr>
          {this.game.m == 2 ? (
            <tr>
              <td colSpan="4" align="left">
                {traduction[this.state.language]["CRITERIAMIXED"]} :
              </td>
              {this.game.n > 4 ? <td></td> : null}
              {this.game.n > 5 ? <td></td> : null}
            </tr>
          ) : null}
          {this.game.m == 2 ? (
            <tr>
              <td colSpan={this.game.n}>
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[0]}
                />{" "}
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[1]}
                />{" "}
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[2]}
                />{" "}
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[3]}
                />{" "}
                {this.game.n > 4 ? (
                  <input
                    className="indS"
                    type="button"
                    value={this.game.sortedInd[4]}
                  />
                ) : null}{" "}
                {this.game.n > 5 ? (
                  <input
                    className="indS"
                    type="button"
                    value={this.game.sortedInd[5]}
                  />
                ) : null}
              </td>
            </tr>
          ) : null}
          {this.state.page === idPage["P_INGAME"] ? (
            <tr>
              <td colSpan={this.game.n}>
                {this.state.soloPlay ? (
                  <input
                    className="smallButtonMain"
                    type="button"
                    value={traduction[this.state.language]["CHECKCODESOLO"]}
                    onClick={() => this.changePage(idPage["P_ASKSOLOPAGE1"])}
                  />
                ) : (
                  <input
                    className="smallButtonMain"
                    type="button"
                    value={traduction[this.state.language]["CHECKCODE"]}
                    onClick={() => this.changePage(idPage["P_TESTCODE"])}
                  />
                )}
                &nbsp;&nbsp;
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["SOLUTION"]}
                  onClick={() => this.changePage(idPage["P_SHOWQUESTION"])}
                />
              </td>
            </tr>
          ) : null}
          {this.state.page === idPage["P_SHOWQUESTION"] ? (
            <tr>
              <td colSpan={this.game.n}>
                <input
                  className="smallButtonHelp"
                  type="button"
                  value={traduction[this.state.language]["SHOW_SOLUTION"]}
                />
                &nbsp;
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["NO"]}
                  onClick={() => {
                    this.changePage(idPage["P_INGAME"]);
                  }}
                />
                &nbsp;
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["YES"]}
                  onClick={() => {
                    this.changePage(idPage["P_SOLUTION"]);
                  }}
                />
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  }

  getPortraitGame() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td colSpan={this.game.m == 1 ? 4 : this.game.m == 2 ? 2 : 3}>
              <button
                id="homeBut"
                className="smallButton"
                type="submit"
                onClick={() => this.changePage(idPage["P_MAIN"])}
              >
                <img src={home} width="20" alt="home" />
              </button>
              {this.state.dailyText != "" ? (
                <span>{this.state.dailyText}&nbsp;</span>
              ) : null}
              {this.state.dailyText != "" ? <br /> : null}
              {"#" + this.game.hash}
              <img
                src={this.state.actualClipboard}
                width="30"
                height="auto"
                alt="copy"
                onClick={() => this.copyToClipboard()}
              />
              {this.state.soloPlay ? (
                <span>
                  <br />
                  {traduction[this.state.language]["SOLOMODE"]}
                </span>
              ) : null}
            </td>
          </tr>
          <tr id="spotTop">
            <td>A</td>
            {this.game.m != 2 ? (
              <td>
                <input className="ind" type="button" value={this.game.ind[0]} />
              </td>
            ) : null}
            {this.game.m == 1 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[0]}
                />
              </td>
            ) : null}
            <td id={"color" + this.game.color}>
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[0]}
            </td>
          </tr>
          <tr id="spotTop">
            <td>B</td>
            {this.game.m != 2 ? (
              <td>
                <input className="ind" type="button" value={this.game.ind[1]} />
              </td>
            ) : null}
            {this.game.m == 1 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[1]}
                />
              </td>
            ) : null}
            <td id={"color" + this.game.color}>
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[1]}
            </td>
          </tr>
          <tr id="spotTop">
            <td>C</td>
            {this.game.m != 2 ? (
              <td>
                <input className="ind" type="button" value={this.game.ind[2]} />
              </td>
            ) : null}
            {this.game.m == 1 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[2]}
                />
              </td>
            ) : null}
            <td id={"color" + this.game.color}>
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[2]}
            </td>
          </tr>
          <tr>
            <td>D</td>
            {this.game.m != 2 ? (
              <td>
                <input className="ind" type="button" value={this.game.ind[3]} />
              </td>
            ) : null}
            {this.game.m == 1 ? (
              <td>
                <input
                  className="ind"
                  type="button"
                  value={this.game.fake[3]}
                />
              </td>
            ) : null}
            <td id={"color" + this.game.color}>
              <img
                src={imgSymb[this.game.color]}
                alt="symbol"
                width="20px"
                height="auto"
              />
              {" " + this.game.crypt[3]}
            </td>
          </tr>
          {this.game.n > 4 ? (
            <tr id="spotBottom">
              <td>E</td>
              {this.game.m != 2 ? (
                <td>
                  <input
                    className="ind"
                    type="button"
                    value={this.game.ind[4]}
                  />
                </td>
              ) : null}
              {this.game.m == 1 ? (
                <td>
                  <input
                    className="ind"
                    type="button"
                    value={this.game.fake[4]}
                  />
                </td>
              ) : null}
              <td id={"color" + this.game.color}>
                <img
                  src={imgSymb[this.game.color]}
                  alt="symbol"
                  width="20px"
                  height="auto"
                />
                {" " + this.game.crypt[4]}
              </td>
            </tr>
          ) : null}
          {this.game.n > 5 ? (
            <tr id="spotBottom">
              <td>F</td>
              {this.game.m != 2 ? (
                <td>
                  <input
                    className="ind"
                    type="button"
                    value={this.game.ind[5]}
                  />
                </td>
              ) : null}
              {this.game.m == 1 ? (
                <td>
                  <input
                    className="ind"
                    type="button"
                    value={this.game.fake[5]}
                  />
                </td>
              ) : null}
              <td id={"color" + this.game.color}>
                <img
                  src={imgSymb[this.game.color]}
                  alt="symbol"
                  width="20px"
                  height="auto"
                />
                {" " + this.game.crypt[5]}
              </td>
            </tr>
          ) : null}
          {this.game.m == 2 ? (
            <tr>
              <td colSpan="2" align="left">
                {traduction[this.state.language]["CRITERIAMIXED"]} :
              </td>
            </tr>
          ) : null}
          {this.game.m == 2 ? (
            <tr>
              <td colSpan="2">
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[0]}
                />{" "}
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[1]}
                />{" "}
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[2]}
                />{" "}
                <input
                  className="indS"
                  type="button"
                  value={this.game.sortedInd[3]}
                />{" "}
                {this.game.n > 4 ? (
                  <input
                    className="indS"
                    type="button"
                    value={this.game.sortedInd[4]}
                  />
                ) : null}{" "}
                {this.game.n > 5 ? (
                  <input
                    className="indS"
                    type="button"
                    value={this.game.sortedInd[5]}
                  />
                ) : null}
              </td>
            </tr>
          ) : null}
          {this.state.page === idPage["P_INGAME"] && !this.state.soloPlay ? (
            <tr>
              <td colSpan={this.game.m == 1 ? 4 : this.game.m == 2 ? 2 : 3}>
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["CHECKCODE"]}
                  onClick={() => this.changePage(idPage["P_TESTCODE"])}
                />
              </td>
            </tr>
          ) : null}
          {this.state.page === idPage["P_INGAME"] && this.state.soloPlay ? (
            <tr>
              <td colSpan={this.game.m == 1 ? 4 : this.game.m == 2 ? 2 : 3}>
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["CHECKCODESOLO"]}
                  onClick={() => this.changePage(idPage["P_ASKSOLOPAGE1"])}
                />
              </td>
            </tr>
          ) : null}
          {this.state.page === idPage["P_INGAME"] ? (
            <tr>
              <td colSpan={this.game.m == 1 ? 4 : this.game.m == 2 ? 2 : 3}>
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["SOLUTION"]}
                  onClick={() => this.changePage(idPage["P_SHOWQUESTION"])}
                />
              </td>
            </tr>
          ) : null}
          {this.state.page !== idPage["P_INGAME"] ? (
            <tr>
              <td colSpan={this.game.m == 1 ? 4 : this.game.m == 2 ? 2 : 3}>
                <input
                  className="smallButtonHelp"
                  type="button"
                  value={traduction[this.state.language]["SHOW_SOLUTION"]}
                />
              </td>
            </tr>
          ) : null}
          {this.state.page !== idPage["P_INGAME"] ? (
            <tr>
              <td colSpan={this.game.m == 1 ? 4 : this.game.m == 2 ? 2 : 3}>
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["NO"]}
                  onClick={() => {
                    this.changePage(idPage["P_INGAME"]);
                  }}
                />
                &nbsp;
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.state.language]["YES"]}
                  onClick={() => {
                    this.changePage(idPage["P_SOLUTION"]);
                  }}
                />
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    );
  }

  displaySocialShare() {
    return (
      <table style={{ marginLeft: "auto", marginRight: "auto" }}>
        <tbody>
          <tr>
            <td colSpan={this.game.n}>
              <span class="emoji">&#128126;</span>TURING MACHINE
              <span class="emoji">&#128126;</span>
              {this.state.dailyText !== "" ? (
                <span>
                  <br />
                  DAILY CHALLENGE
                  <br />
                  {this.state.dailyText}
                </span>
              ) : null}
              <br />
              {"#" + this.game.hash}
            </td>
          </tr>
          {this.state.finalTab.map((round, idRound) => (
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
            <td colSpan={this.game.n}>
              {this.state.winSolo === 0
                ? traduction[this.state.language]["SOCIALLOSE"]
                : null}
              {this.state.winSolo === 1
                ? traduction[this.state.language]["SOCIALWIN"]
                : null}
              {this.state.winSolo === 2
                ? traduction[this.state.language]["SOCIALWIN"]
                : null}
            </td>
          </tr>
          <tr>
            <td colSpan={this.game.n}>
              <img
                src={this.state.actualCopySocialImg}
                width="50"
                height="auto"
                alt="copy"
                onClick={() => this.copySocialTXTToClipboard()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getLandscapeSolution() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td colSpan={this.game.n}>
              <button
                id="homeBut"
                className="smallButton"
                type="submit"
                onClick={() => this.changePage(idPage["P_MAIN"])}
              >
                <img src={home} width="20" alt="home" />
              </button>
              {"#" + this.game.hash}
              <img
                src={this.state.actualClipboard}
                width="30"
                height="auto"
                alt="copy"
                onClick={() => this.copyToClipboard()}
              />
            </td>
          </tr>
          {this.state.youWin && !this.state.soloPlay ? (
            <tr>
              <td colSpan={this.game.n}>
                {traduction[this.state.language]["YOUWIN"]}
              </td>
            </tr>
          ) : null}
          {this.state.youWin && this.state.soloPlay ? (
            <tr>
              <td colSpan={this.game.n}>{this.displaySocialShare()}</td>
            </tr>
          ) : null}
          {this.state.youWin &&
          this.state.soloPlay &&
          this.state.winSolo === 0 ? (
            <tr>
              <td colSpan={this.game.n}>
                {traduction[this.state.language]["WINSOLO0"]}
              </td>
            </tr>
          ) : null}
          {this.state.youWin &&
          this.state.soloPlay &&
          this.state.winSolo === 1 ? (
            <tr>
              <td colSpan={this.game.n}>
                {traduction[this.state.language]["WINSOLO1"]}
              </td>
            </tr>
          ) : null}
          {this.state.youWin &&
          this.state.soloPlay &&
          this.state.winSolo === 2 ? (
            <tr>
              <td colSpan={this.game.n}>
                {traduction[this.state.language]["WINSOLO2"]}
              </td>
            </tr>
          ) : null}
          {this.state.soloPlay ? (
            <tr>
              <td colSpan={this.game.n}>
                MACHINE : {Math.ceil(this.game.par / 3)} ROUNDS /{" "}
                {this.game.par} QUESTIONS
              </td>
            </tr>
          ) : null}
          <tr>
            <td colSpan={this.game.n}>
              {traduction[this.state.language]["CODE"] + " : " + this.game.code}
            </td>
          </tr>
          <tr>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
            {this.game.n > 4 ? <td>E</td> : null}
            {this.game.n > 5 ? <td>F</td> : null}
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
                    this.game.law[0] +
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
                    this.game.law[1] +
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
                    this.game.law[2] +
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
                    this.game.law[3] +
                    "_Mini.jpg')"
                }}
              ></button>
            </td>
            {this.game.n > 4 ? (
              <td>
                <button
                  id="solBut"
                  className="solButton"
                  type="submit"
                  style={{
                    backgroundImage:
                      "url('https://www.pcspace.com/tl/img/laws/" +
                      this.game.law[4] +
                      "_Mini.jpg')"
                  }}
                ></button>
              </td>
            ) : null}
            {this.game.n > 5 ? (
              <td>
                <button
                  id="solBut"
                  className="solButton"
                  type="submit"
                  style={{
                    backgroundImage:
                      "url('https://www.pcspace.com/tl/img/laws/" +
                      this.game.law[5] +
                      "_Mini.jpg')"
                  }}
                ></button>
              </td>
            ) : null}
          </tr>
          <tr>
            <td colSpan={this.game.n}>
              <input
                className="smallButton"
                type="button"
                value={traduction[this.state.language]["BACK"]}
                onClick={() => this.changePage(idPage["P_INGAME"])}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getPortraitSolution() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td colSpan="3">
              <button
                id="homeBut"
                className="smallButton"
                type="submit"
                onClick={() => this.changePage(idPage["P_MAIN"])}
              >
                <img src={home} width="20" alt="home" />
              </button>
              {"#" + this.game.hash}
              <img
                src={this.state.actualClipboard}
                width="30"
                height="auto"
                alt="copy"
                onClick={() => this.copyToClipboard()}
              />
            </td>
          </tr>
          {this.state.youWin && !this.state.soloPlay ? (
            <tr>
              <td colSpan="3">{traduction[this.state.language]["YOUWIN"]}</td>
            </tr>
          ) : null}
          {this.state.youWin && this.state.soloPlay ? (
            <tr>
              <td colSpan={this.game.n}>{this.displaySocialShare()}</td>
            </tr>
          ) : null}
          {this.state.youWin &&
          this.state.soloPlay &&
          this.state.winSolo === 0 ? (
            <tr>
              <td colSpan="3">{traduction[this.state.language]["WINSOLO0"]}</td>
            </tr>
          ) : null}
          {this.state.youWin &&
          this.state.soloPlay &&
          this.state.winSolo === 1 ? (
            <tr>
              <td colSpan="3">{traduction[this.state.language]["WINSOLO1"]}</td>
            </tr>
          ) : null}
          {this.state.youWin &&
          this.state.soloPlay &&
          this.state.winSolo === 2 ? (
            <tr>
              <td colSpan="3">{traduction[this.state.language]["WINSOLO2"]}</td>
            </tr>
          ) : null}
          {this.state.soloPlay ? (
            <tr>
              <td colSpan="3">
                MACHINE : {Math.ceil(this.game.par / 3)} ROUNDS /{" "}
                {this.game.par} QUESTIONS
              </td>
            </tr>
          ) : null}
          <tr>
            <td colSpan="3">
              {traduction[this.state.language]["CODE"] + " : " + this.game.code}
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
                    this.game.law[0] +
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
                    this.game.law[1] +
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
                    this.game.law[2] +
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
                    this.game.law[3] +
                    "_Mini.jpg')"
                }}
              ></button>
            </td>
          </tr>
          {this.game.n > 4 ? (
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
                      this.game.law[4] +
                      "_Mini.jpg')"
                  }}
                ></button>
              </td>
            </tr>
          ) : null}
          {this.game.n > 5 ? (
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
                      this.game.law[5] +
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
                value={traduction[this.state.language]["BACK"]}
                onClick={() => this.changePage(idPage["P_INGAME"])}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getLandscapeAdvancedMenu() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              {this.state.page !== idPage["P_MAIN"] ? (
                <button
                  id="homeBut"
                  className="smallButton"
                  type="submit"
                  onClick={() => this.changePage(idPage["P_MAIN"])}
                >
                  <img src={home} width="20" alt="home" />
                </button>
              ) : null}
              {this.getAdvancedButton(0, 0, "COMPETITIVE")}
            </td>
            <td>{this.getAdvancedButton(1, 0, "CLASSIC")}</td>
            <td>{this.getAdvancedButton(2, 0, "EASY")}</td>
            <td>{this.getAdvancedButton(3, 0, "V4")}</td>
            <td></td>
          </tr>
          <tr>
            <td>{this.getAdvancedButton(0, 1, "SOLO")}</td>
            <td>{this.getAdvancedButton(1, 1, "EXTREME")}</td>
            <td>{this.getAdvancedButton(2, 1, "MEDIUM")}</td>
            <td>{this.getAdvancedButton(3, 1, "V5")}</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>{this.getAdvancedButton(1, 2, "NIGHTMARE")}</td>
            <td>{this.getAdvancedButton(2, 2, "HARD")}</td>
            <td>{this.getAdvancedButton(3, 2, "V6")}</td>
            <td>
              <input
                className="advButton"
                type="button"
                value={traduction[this.state.language]["PLAY"]}
                onClick={() => this.playAdvanced()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getPortraitAdvancedMenu() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              {this.state.page !== idPage["P_MAIN"] ? (
                <button
                  id="homeBut"
                  className="smallButton"
                  type="submit"
                  onClick={() => this.changePage(idPage["P_MAIN"])}
                >
                  <img src={home} width="20" alt="home" />
                </button>
              ) : null}
              {this.getAdvancedButton(0, 0, "COMPETITIVE")}
            </td>
            <td>{this.getAdvancedButton(0, 1, "SOLO")}</td>
            <td></td>
          </tr>
          <tr>
            <td>{this.getAdvancedButton(1, 0, "CLASSIC")}</td>
            <td>{this.getAdvancedButton(1, 1, "EXTREME")}</td>
            <td>{this.getAdvancedButton(1, 2, "NIGHTMARE")}</td>
          </tr>
          <tr>
            <td>{this.getAdvancedButton(2, 0, "EASY")}</td>
            <td>{this.getAdvancedButton(2, 1, "MEDIUM")}</td>
            <td>{this.getAdvancedButton(2, 2, "HARD")}</td>
          </tr>
          <tr>
            <td>{this.getAdvancedButton(3, 0, "V4")}</td>
            <td>{this.getAdvancedButton(3, 1, "V5")}</td>
            <td>{this.getAdvancedButton(3, 2, "V6")}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <input
                className="advButton"
                type="button"
                value={traduction[this.state.language]["PLAY"]}
                onClick={() => this.playAdvanced()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  getLandscapeMainPage() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>
              {this.state.page !== idPage["P_MAIN"] ? (
                <button
                  id="homeBut"
                  className="smallButton"
                  type="submit"
                  onClick={() => this.changePage(idPage["P_MAIN"])}
                >
                  <img src={home} width="20" alt="home" />
                </button>
              ) : null}
              {this.state.historicalData ? (
                <button
                  id="histBut"
                  className="smallButton"
                  type="submit"
                  onClick={() => this.changePage(idPage["P_HIST"])}
                >
                  <img src={history} width="20" alt="history" />
                </button>
              ) : null}
              <table
                className="mainTabBox"
                style={{
                  backgroundImage: `url(${imgBox[this.state.language]})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <form onSubmit={() => this.hashGame()}>
                        <img
                          style={{ verticalAlign: "middle" }}
                          alt="logoTM"
                          src={logoTM}
                          width="auto"
                          height="25"
                        />
                        &nbsp;
                        <input
                          className="text"
                          type="text"
                          defaultValue=""
                          placeholder={
                            traduction[this.state.language]["SEARCH"]
                          }
                          size="15"
                          onChange={(e) => this.handleChange(e.target.value)}
                        />
                      </form>
                    </td>
                  </tr>
                  <tr height="70%">
                    <td></td>
                  </tr>
                  <tr>
                    <td>{this.getOptionMenu()}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>{this.getMainMenu()}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  getPortraitMainPage() {
    return (
      <table className="mainTab">
        <tbody>
          <tr style={{ height: "50%" }}>
            <td>
              {this.state.page !== idPage["P_MAIN"] ? (
                <button
                  id="homeBut"
                  className="smallButton"
                  type="submit"
                  onClick={() => this.changePage(idPage["P_MAIN"])}
                >
                  <img src={home} width="20" alt="home" />
                </button>
              ) : null}
              {this.state.historicalData ? (
                <button
                  id="histBut"
                  className="smallButton"
                  type="submit"
                  onClick={() => this.changePage(idPage["P_HIST"])}
                >
                  <img src={history} width="20" alt="history" />
                </button>
              ) : null}
              <table
                className="mainTabBox"
                style={{
                  backgroundImage: `url(${imgBox[this.state.language]})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
              >
                <tbody>
                  <tr>
                    <td>
                      <form onSubmit={() => this.hashGame()}>
                        <img
                          style={{ verticalAlign: "middle" }}
                          alt="logoTM"
                          src={logoTM}
                          width="auto"
                          height="25"
                        />
                        &nbsp;
                        <input
                          className="text"
                          type="text"
                          defaultValue=""
                          placeholder={
                            traduction[this.state.language]["SEARCH"]
                          }
                          size="15"
                          onChange={(e) => this.handleChange(e.target.value)}
                        />
                      </form>
                    </td>
                  </tr>
                  <tr style={{ height: "80%" }}>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style={{ height: "40%" }}>
            <td>{this.getMainMenu()}</td>
          </tr>
          <tr style={{ height: "10%" }}>
            <td>{this.getOptionMenu()}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
