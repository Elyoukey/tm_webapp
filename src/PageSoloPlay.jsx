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

                <div className="radioGroup clear">
                <input
                    className="fullgreen"
                    type="button"
                    value={traduction[this.props.language]["ADDROUND"]}
                    onClick={() => this.addRound()}
                />
                <input
                    className="fullgreen"
                    type="button"
                    value={traduction[this.props.language]["DELROUND"]}
                    onClick={() => this.deleteRound()}
                />
                </div>
                <input
                    className="fullgreen"
                    type="button"
                    value={traduction[this.props.language]["BEATTHEMACHINE"]}
                    onClick={() => this.props.changePage(idPage["P_ASKSOLOPAGE2"])}
                />
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
        );
    }

}

export default PageSoloPlay;
