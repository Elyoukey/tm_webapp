import { Component } from "react";
import ShareButton from "./shareButton";
import "./styles.css";
import "./css/PageResultMachine.css";

import traduction from "./traduction";
import idPage from "./idPage";

import appface0 from "./images/appface0.png";
import appface1 from "./images/appface1.png";
import CopyButton from "./copyButton";
import MarkCell from "./markCell";

class PageResultMachine extends Component {

    render() {

        let vsmachinetext1 = traduction[this.props.language]["VSMACHINETEXT1"];
        vsmachinetext1 = vsmachinetext1.replace( '{$c}', this.props.game.code );
        vsmachinetext1 = vsmachinetext1.replace( '{$r}', this.props.roundValue );
        vsmachinetext1 = vsmachinetext1.replace( '{$q}', this.props.questionValue );
        let roundMachine = Math.ceil(this.props.game.par / 3);
        let questionMachine = this.props.game.par;
        let vsmachinetext2 = traduction[this.props.language]["VSMACHINETEXT2"];
        vsmachinetext2 = vsmachinetext2.replace( '{$c}', this.props.game.code );
        vsmachinetext2 = vsmachinetext2.replace( '{$r}', roundMachine );
        vsmachinetext2 = vsmachinetext2.replace( '{$q}', questionMachine );

        let letters = [];
        for (let i = 0; i < this.props.game.n; i++) {
            letters.push(String.fromCharCode(97 + i));
        }
        let grid = [];
        for (let i = 0; i < this.props.finalTab.length ; i++) {
            let row = [];
            for (let j = 0; j < this.props.finalTab[i].length ; j++) {
                row.push(
                    <div className='cell'>
                        <MarkCell
                            value={this.props.finalTab[i][j]}
                            row={i}
                            cell={j}
                            disabled={true}
                        />
                    </div>
                );
            }
            grid.push(<div className='row'>{row}</div>);
        }


        return (
            <div className="mainTab pageResultMachine">
                {this.props.winSolo === 0
                    ?
                    (
                        <div className="">
                            <h2
                            className="failure"
                            dangerouslySetInnerHTML={{ __html: traduction[this.props.language]["WINSOLO0"] }}
                            ></h2>
                            <div className="imageContainer failure">
                                <img
                                    className="face failure"
                                    src={appface0}
                                />
                            </div>
                        </div>
                    )
                : null}
                {this.props.winSolo === 1 || this.props.winSolo === 2
                    ? (
                        <div className="">
                            <h2
                            className="success"
                            dangerouslySetInnerHTML={{ __html: traduction[this.props.language]["WINSOLO2"] }}
                            ></h2>
                            <div className="imageContainer success">
                                <img
                                    className="face"
                                    src={appface1}
                                />
                            </div>
                        </div>
                    )
                : null}
                <div className="hash">
                    #{this.props.game.hash}
                </div>
                <p dangerouslySetInnerHTML={{ __html: vsmachinetext1 }}
                ></p>
                <p dangerouslySetInnerHTML={{ __html: vsmachinetext2 }}
                ></p>

                <div className="answerGrid">
                    <div className="row">
                        {letters.map(function (letter, index) {
                            return (
                                <div key={index} className="cell letter">{letter}</div>
                            );
                        })}
                    </div>                    {grid}

                </div>

                <div className="separator"></div>
                <div className="shareLabel">
                    {traduction[this.props.language]["SHARERESULTS"]}
                </div>
                <ShareButton
                    language={this.props.language}
                    socialTXT={this.props.socialTXT}
                    game={this.props.game}
                    winSolo={this.props.winSolo}
                    finalTab={this.props.finalTab}
                    dailyText={this.props.dailyText}
                />

                <div className="footer">
                    <a
                        id="homeBut"
                        className="backlink"
                        type="submit"
                        onClick={() => this.props.changePage(idPage["P_ASKSOLOPAGE1"])}
                    >
                        {traduction[this.props.language]["BACKTOGAME"]}
                    </a>
                </div>
            </div>
        );
    }
}

export default PageResultMachine;