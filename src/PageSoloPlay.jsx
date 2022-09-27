import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

import noteBox from "./images/NoteBox.jpg";
import noteBoxYES from "./images/NoteBoxYES.jpg";
import noteBoxNO from "./images/NoteBoxNO.jpg";

class PageSoloPlay extends Component {
  state = {
    nbRounds: 1,
    questionsTab: [[0, 0, 0, 0, 0, 0]],
    maximumQuestionsReach: false,
    validButton: false
  };

  testCodeSolo() {
    this.state.validButton = false;
    this.state.maximumQuestionsReach = false;
    this.state.nbRounds = 1;
    this.state.questionsTab = [[]];
    for (var i = 0; i < this.props.game.n; i++) {
      this.state.questionsTab[0].push(0);
    }
    this.props.testCodeSolo();
  }

  clickBox(idRound, idQuestion, value) {
    let nbQuestions = 0;
    this.state.questionsTab[idRound].forEach((v) => {
      if (v !== 0) {
        nbQuestions++;
      }
    });
    if (
      nbQuestions === 3 &&
      this.state.questionsTab[idRound][idQuestion] === 0
    ) {
      this.setState({ maximumQuestionsReach: true });
      return;
    }
    let newQuestionsTab = [...this.state.questionsTab];
    newQuestionsTab[idRound][idQuestion] = value;
    nbQuestions = 0;
    newQuestionsTab[idRound].forEach((v) => {
      if (v !== 0) {
        nbQuestions++;
      }
    });
    if (nbQuestions === 0) {
      this.setState({
        validButton: false,
        maximumQuestionsReach: false,
        questionsTab: newQuestionsTab
      });
    } else {
      this.setState({
        validButton: true,
        maximumQuestionsReach: false,
        questionsTab: newQuestionsTab
      });
    }
  }

  addRound() {
    let newRoundTab = [];
    for (var i = 0; i < this.props.game.n; i++) {
      newRoundTab.push(0);
    }
    let newQuestionsTab = [...this.state.questionsTab];
    newQuestionsTab.push(newRoundTab);
    this.setState({
      questionsTab: newQuestionsTab
    });
  }

  delRound() {
    let newQuestionsTab = [];
    for (var i = 0; i < this.state.questionsTab.length - 1; i++) {
      newQuestionsTab.push(this.state.questionsTab[i]);
    }
    this.setState({
      questionsTab: newQuestionsTab
    });
  }

  submit() {
    let finalTab = [];
    let socialTXT = "";
    if (this.props.dailyText != "") {
      socialTXT =
        "🤖TURING MACHINE🤖\n\rDAILY CHALLENGE\n\r" +
        this.props.dailyText +
        "\n\r#" +
        this.props.game.hash +
        "\n\r";
    } else {
      socialTXT = "🤖TURING MACHINE🤖\n\r#" + this.props.game.hash + "\n\r";
    }
    let nbRounds = 0;
    let nbQuestions = 0;
    for (var r = 0; r < this.state.questionsTab.length; r++) {
      let nbQuestionsThisRound = 0;
      for (var q = 0; q < this.state.questionsTab[r].length; q++) {
        if (this.state.questionsTab[r][q] === 0) {
          socialTXT = socialTXT + "🔲";
        }
        if (this.state.questionsTab[r][q] === 1) {
          socialTXT = socialTXT + "✅";
          nbQuestionsThisRound++;
        }
        if (this.state.questionsTab[r][q] === 2) {
          socialTXT = socialTXT + "❌";
          nbQuestionsThisRound++;
        }
      }
      if (nbQuestionsThisRound > 0) {
        finalTab.push(this.state.questionsTab[r]);
        nbRounds++;
        nbQuestions += nbQuestionsThisRound;
        socialTXT = socialTXT + "\n\r";
      }
    }

    this.props.testCodeSoloVictory(nbRounds, nbQuestions, socialTXT, finalTab);
  }

  render() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            {this.props.page === idPage["P_ASKSOLOPAGE1"]
              ? this.getPage1()
              : null}
            {this.props.page === idPage["P_ASKSOLOPAGE2"]
              ? this.getPage2()
              : null}
          </tr>
        </tbody>
      </table>
    );
  }

  getPage1() {
    return (
      <td>
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
          size="20"
          onChange={(e) => this.props.handleChangeCode(e.target.value)}
        />
        <br />
        <input
          className="smallButtonMain"
          type="button"
          value={traduction[this.props.language]["TESTCODE"]}
          onClick={() => this.testCodeSolo()}
        />
        &nbsp;
        <input
          className="smallButtonMain"
          type="button"
          value={traduction[this.props.language]["CANCEL"]}
          onClick={() => this.props.changePage(idPage["P_INGAME"])}
        />
      </td>
    );
  }

  getPage2() {
    return (
      <td>
        <table className="mainTab">
          <tbody>
            <tr>
              <td colSpan={this.props.game.n}>
                <span>{traduction[this.props.language]["GOODCODE"]}</span>
                <br />
                <span>{traduction[this.props.language]["INPUTSOLOA"]}</span>
                <br />
                <span>{traduction[this.props.language]["INPUTSOLOB"]}</span>
                <br />
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
            {this.state.questionsTab.map((round, idRound) => (
              <tr>
                {round.map((question, idQuestion) => (
                  <td>
                    {question === 0 ? (
                      <img
                        src={noteBox}
                        alt="empty"
                        onClick={() => this.clickBox(idRound, idQuestion, 1)}
                      />
                    ) : null}
                    {question === 1 ? (
                      <img
                        src={noteBoxYES}
                        alt="empty"
                        onClick={() => this.clickBox(idRound, idQuestion, 2)}
                      />
                    ) : null}
                    {question === 2 ? (
                      <img
                        src={noteBoxNO}
                        alt="empty"
                        onClick={() => this.clickBox(idRound, idQuestion, 0)}
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td colSpan={this.props.game.n}>
                <input
                  className="smallButtonMain"
                  type="button"
                  value={traduction[this.props.language]["ADDROUND"]}
                  onClick={() => this.addRound()}
                />
                &nbsp;
                {this.state.questionsTab.length > 1 ? (
                  <input
                    className="smallButtonMain"
                    type="button"
                    value={traduction[this.props.language]["DELROUND"]}
                    onClick={() => this.delRound()}
                  />
                ) : null}
              </td>
            </tr>
            <tr>
              <td colSpan={this.props.game.n}>
                {this.state.validButton ? (
                  <button
                    className="buttonMain3"
                    type="button"
                    onClick={() => this.submit()}
                    style={{ fontSize: 40 }}
                  >
                    <span style={{ verticalAlign: "middle" }}>
                      {traduction[this.props.language]["SUBMITSOLOQUESTIONS"]}
                    </span>
                  </button>
                ) : (
                  <span>{traduction[this.props.language]["CLICBOXES"]}</span>
                )}
                {this.state.maximumQuestionsReach ? (
                  <span>
                    <br />
                    {traduction[this.props.language]["MAX3"]}
                  </span>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    );
  }

  getCheckBoxButton(round, zone) {
    return (
      <td>
        {this.state.questionsTab[round][zone] === 0 ? (
          <img src={noteBox} alt="empty" />
        ) : null}
        {this.state.questionsTab[round][zone] === 1 ? (
          <img src={noteBoxYES} alt="yes" />
        ) : null}
        {this.state.questionsTab[round][zone] === 2 ? (
          <img src={noteBoxNO} alt="no" />
        ) : null}
      </td>
    );
  }
}

export default PageSoloPlay;
