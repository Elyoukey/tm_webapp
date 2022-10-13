import {Component} from "react";
import "./styles.css";
import "./css/PageAskSolo.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageAskSolo extends Component {
    render() {
        return (
            <div className="mainTab pageAskSolo">
                {this.props.dailyText!=="" ?
                    (<h2>{traduction[this.props.language]["DAY"]}</h2>):
                    (<h2>{traduction[this.props.language]["CHOOSETYPE"]}</h2>)
                }


                <div class="content">
                    <p>{traduction[this.props.language]["GAMETYPE"]}</p>

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
                    <input
                        className="fullgreen"
                        type="button"
                        value={traduction[this.props.language]["PLAY"]}
                        onClick={() => this.props.changePage(idPage["P_INGAME"])}
                    />
                </div>
                <div className="footer">
                    <a
                        id="homeBut"
                        className="backlink"
                        type="submit"
                        onClick={() => this.props.changePage(idPage["P_MAIN"])}
                    >
                        {traduction[this.props.language]["BACKHOME"]}
                    </a>
                </div>
            </div>
        );
    }
}

export default PageAskSolo;
