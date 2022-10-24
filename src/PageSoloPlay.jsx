import {Component} from "react";
import "./styles.css";
import "./css/PageSoloPlay.css";

import traduction from "./traduction";
import idPage from "./idPage";

import MarkCell from "./markCell";
import CodeButton from "./codeButton";

class PageSoloPlay extends Component {
    state = {
        nbRounds: 1,
        questionsTab: [[]],
        maximumQuestionsReach: false,
        validButton: false
    };

    constructor(props) {
        super(props);
        let newQuestionTab = [[]];
        for (let i = 0; i < this.props.game.n; i++) {
            this.state.questionsTab[0].push(0);
        }
    }

    addRound() {
        let newQuestionsTab = this.state.questionsTab;
        let row = [];
        for (let i = 0; i < this.props.game.n; i++) {
            row.push(0);
        }
        newQuestionsTab.push(row);
        this.setState({questionsTab: newQuestionsTab})
    }
    deleteRound() {
        let newQuestionsTab = this.state.questionsTab;
        newQuestionsTab.splice(newQuestionsTab.length-1,1);
        this.setState({questionsTab: newQuestionsTab})
    }

    updateFunction(row, cell, value) {
        let newQuestionsTab = this.state.questionsTab;

        // check max values for row
        let total = 0;
        for (let i = 0; i < this.props.game.n; i++) {
            if (this.state.questionsTab[row][i] != 0 && i != cell) {
                total++;
            }
        }
        if (total >= 3) return; // already 3 values

        // set value and update state
        newQuestionsTab[row][cell] = value;
        this.setState({questionsTab: newQuestionsTab})
    }


    // check if victory VS machine + change page
    submit() {
        let finalTab = [];
        let socialTXT = "";
        let questionSeq = '';
        if (this.props.dailyText != "") {
            socialTXT =
                "TURING MACHINE" +
                "\n"+
                traduction[this.props.language]["DAiLYCHALLENGE"]+" - " + this.props.dailyText +
                "\n" +
                "#" + this.props.game.hash.replace(/ /g,"") +
                "\n";
        } else {
            socialTXT =
                "TURING MACHINE"+
                "\n"+
                "#" + this.props.game.hash.replace(/ /g,"") +
                "\n";
        }
        socialTXT += "\n";
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
            socialTXT += "\n";
            if (nbQuestionsThisRound > 0) {
                finalTab.push(this.state.questionsTab[r]);
                nbRounds++;
                nbQuestions += nbQuestionsThisRound;
            }
        }
        socialTXT += "\n\n";
        socialTXT += "https://www.turingmachine.info";
        this.props.testCodeSoloVictory(nbRounds, nbQuestions, socialTXT, finalTab);
        this.props.changePage(idPage["P_RESULTMACHINE"], false);
    }

    render() {
        // letter listing
        let letters = [];
        for (let i = 0; i < this.props.game.n; i++) {
            letters.push(String.fromCharCode(97 + i));
        }

        // build the grid
        let grid = [];
        for (let i = 0; i < this.state.questionsTab.length; i++) {
            let row = [];
            for (let j = 0; j < this.state.questionsTab[i].length; j++) {
                row.push(
                    <div className='cell'>
                        <MarkCell
                            value={this.state.questionsTab[i][j]}
                            row={i}
                            cell={j}
                            updateFunction={(row, cell, value) => this.updateFunction(row, cell, value)}
                        />
                    </div>
                );
            }
            grid.push(<div className='row'>{row}</div>);
        }


        return (
            <div className="mainTab pageSoloPlay">
                <h2>{traduction[this.props.language]["COMPARETOMACHINE"]}</h2>
                <label class="question">{traduction[this.props.language]["INPUTSOLOB"]}</label>


                <div className="answerGrid">
                    <div className="row">
                        {letters.map(function (letter, index) {
                            return (
                                <div key={index} className="cell letter">{letter}</div>
                            );
                        })}
                    </div>

                    {grid}

                </div>


                <a
                    className="button fit white plus"
                    onClick={() => this.addRound()}
                >{traduction[this.props.language]["ADDROUND"]}
                </a>
                <a
                    className="button fit white minus"
                    onClick={() => this.deleteRound()}
                >
                    {traduction[this.props.language]["DELROUND"]}
                </a>

                <div className="footer">
                    <input
                        className="fullgreen"
                        type="button"
                        value={traduction[this.props.language]["BEATTHEMACHINE"]}
                        onClick={() => this.submit()}
                    />
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
        );
    }

}

export default PageSoloPlay;
