import {Component} from "react";
import "./styles.css";
import "./css/PageInputCode.css";

import traduction from "./traduction";
import idPage from "./idPage";
import codeButton from "./codeButton";
import CodeButton from "./codeButton";

class PageInputCode extends Component {
    render() {

        // initialize buttons
        let buttons = [];
        for (let i = 5; i > 0; i--) {
            for (let j = 0; j < 3; j++) {
                buttons.push(
                    <CodeButton
                        number={i}
                        digit={j}
                        codeValue={this.props.codeValue}
                        setCodeDigit={(number, digit) => this.props.setCodeDigit(number, digit)}
                    ></CodeButton>);
            }
            buttons.push(<br/>);
        }
        let r = this.props.codeValue.split("");
        return (
            <div className="mainTab pageInputCode">

                <h2>{traduction[this.props.language]["CHECKCODE"]}</h2>

                {this.props.codeValue === '___' ? (
                    <div className="codeDisplayer">{traduction[this.props.language]["INPUTCODE"]}</div>
                ) : (
                    <div
                        className={
                            "codeDisplayer code "+
                            (this.props.wrongCode ? "wrongCode" : "") +
                            (this.props.correctCode ? "correctCode" : "")
                            }
                    >
                        <span className="digit">
                            {r[0]}
                        </span>
                        <span className="digit">
                        {r[1]}
                             </span>
                        <span className="digit">
                        {r[2]}
                        </span>
                    </div>
                )}

                <div className="">
                    <span className="blueTriangle"></span>
                    <span className="yellowSquare"></span>
                    <span className="purpleCircle"></span>
                </div>
                <div className="codeInserter">
                    {buttons}
                </div>

                <div className="codeMessage">
                { !this.props.wrongCode && !this.props.correctCode ? (
                    <span className="wrongCode">&nbsp;</span>
                ) : null}
                {this.props.wrongCode ? (
                    <span className="wrongCode">{traduction[this.props.language]["FALSECODE"]}</span>
                ) : null}
                {this.props.correctCode ? (
                    <span className="correctCode">{traduction[this.props.language]["GOODCODE"]}</span>
                ) : null}
                </div>
                { !this.props.wrongCode && !this.props.correctCode ? (
                <input
                    className="fullgreen"
                    type="button"
                    value={traduction[this.props.language]["TESTCODE"]}
                    onClick={() => this.props.testCode()}
                />
                ):null}

                { this.props.wrongCode ? (
                <input
                    className="fullgreen"
                    type="button"
                    value={traduction[this.props.language]["TRYAGAIN"]}
                    onClick={() => this.props.testCode()}
                />
                ):null}

                { this.props.correctCode && this.props.soloPlay ? (
                <input
                    className="fullgreen"
                    type="button"
                    value={traduction[this.props.language]["BEATTHEMACHINE"]}
                    onClick={() => this.props.changePage(idPage["P_ASKSOLOPAGE1"])}
                />
                ):null}


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

export default PageInputCode;
