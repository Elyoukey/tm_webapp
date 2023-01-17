import {Component} from "react";
import "./styles.css";
import "./css/PageAskSolo.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageCreateChallenge extends Component {
    state = {
        gametype:1
    }
    render(){
        return(
            <div className="mainTab pageCreateChallenge">
                <h2>{traduction[this.props.language]["CREATECHALLENGE"]}</h2>

                <label className="label">
                    {traduction[this.props.language]["GAMETYPE"]}
                </label>

                <div className="radioGroup">
                    <input
                        type="button"
                        className={!this.props.soloPlay
                            ? "active"
                            : "inactive"
                        }
                        value={traduction[this.props.language]["COMPETITIVE"]}
                        onClick={() => this.props.goCompetitive()}
                    />
                    <input
                        type="button"
                        className={this.props.soloPlay
                            ? "active"
                            : "inactive"
                        }
                        value={traduction[this.props.language]["SOLO"]}
                        onClick={() => this.props.goSolo()}
                    />
                </div>

                <label className="label">
                    {traduction[this.props.language]["STEP3"]}
                </label>
                <div className="radioGroup">
                    <input
                        type="button"
                        className={ this.props.advancedSettings[3] === 0
                            ? "active"
                            : "inactive"
                        }
                        value={traduction[this.props.language]["V4"]}
                        onClick={() => this.props.clickAdvanced(3, 0)}
                    />
                    <input
                        type="button"
                        className={ this.props.advancedSettings[3] === 1
                            ? "active"
                            : "inactive"
                        }
                        value={traduction[this.props.language]["V5"]}
                        onClick={() => this.props.clickAdvanced(3, 1)}
                    />
                    <input
                        type="button"
                        className={ this.props.advancedSettings[3] === 2
                            ? "active"
                            : "inactive"
                        }
                        value={traduction[this.props.language]["V6"]}
                        onClick={() => this.props.clickAdvanced(3, 2)}
                    />
                </div>

            </div>
        );
    }
}

export default PageCreateChallenge;