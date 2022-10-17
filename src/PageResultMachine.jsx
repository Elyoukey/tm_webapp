import { Component } from "react";
import ShareButton from "./shareButton";
import "./styles.css";
import "./css/PageResultMachine.css";

import traduction from "./traduction";
import idPage from "./idPage";

import appface0 from "./images/appface0.png";
import appface1 from "./images/appface1.png";
import CopyButton from "./copyButton";

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
console.log(this.props);
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

                <p dangerouslySetInnerHTML={{ __html: vsmachinetext1 }}
                ></p>
                <p dangerouslySetInnerHTML={{ __html: vsmachinetext2 }}
                ></p>

                <ShareButton
                    text={this.props.socialTXT}
                    game={this.props.game}
                    winSolo={this.props.winSolo}
                    finalTab={this.props.finalTab}
                    dailyText={this.props.dailyText}
                />
                <pre>{this.props.socialTXT}</pre>
                <div className="separator"></div>

                <p>{traduction[this.props.language]["INVITEFRIENDS"]}</p>
                <h2>
                    {"#" + this.props.game.hash}
                    <CopyButton
                        text = {"#" + this.props.game.hash}
                        language = {this.props.language}
                    />
                </h2>

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