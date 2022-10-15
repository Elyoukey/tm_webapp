import { Component } from "react";
import "./styles.css";
import "./css/PageShowSolution.css";

import traduction from "./traduction";
import idPage from "./idPage";
import config from "./config";

import home from "./images/Home.png";
import noteBox from "./images/NoteBox.jpg";
import noteBoxYES from "./images/NoteBoxYES.png";
import noteBoxNO from "./images/NoteBoxNO.png";
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
