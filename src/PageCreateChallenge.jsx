import {Component} from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";
import CardPicker from "./cardPicker";
import config from "./config";

class PageCreateChallenge extends Component {
    state = {
        gameType: 'solo',
        nbCards: 4,
        selectedCards: [],
        render: true
    }

    constructor(props) {
        super(props);
        this.props.clickAdvanced(3, 0);
    }

    changeVerificator( x ){
        this.props.clickAdvanced(3, x);
        this.setState({render:!this.state.render})
    }

    setSelectedCards( cardList ){
        this.setState({selectedCards:cardList });
    }
    generate(){
        var xhr = new XMLHttpRequest();
        var nbCards = this.props.advancedSettings[3]+4;

        xhr.addEventListener("load", () => {
            var data = xhr.responseText;
            var jsonResponse = JSON.parse(data);
            this.props.loadGame("h=" + jsonResponse['h'] );
        });
        xhr.addEventListener("error", () => {

        });
        xhr.addEventListener("abort", () => {

        });
        xhr.open(
            "GET",
            config.API+"wizard.php?n=" + nbCards + "&cards=[" + this.state.selectedCards.join(',') + ']' + '&mode=' + 'normal'
        );
        xhr.send();
    }


    render(){
        this.selectedCardList = [1];
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
                        onClick={() => this.changeVerificator(0)}
                    />
                    <input
                        type="button"
                        className={ this.props.advancedSettings[3] === 1
                            ? "active"
                            : "inactive"
                        }
                        value={traduction[this.props.language]["V5"]}
                        onClick={() => this.changeVerificator(1)}
                    />
                    <input
                        type="button"
                        className={ this.props.advancedSettings[3] === 2
                            ? "active"
                            : "inactive"
                        }
                        value={traduction[this.props.language]["V6"]}
                        onClick={() => this.changeVerificator(2)}
                    />
                </div>
                <label className="label">
                    {traduction[this.props.language]["CRITERIACARDS"]}
                </label>
                <CardPicker
                    language = {this.props.language}
                    setSelectedCards = {(selectedCards)=>this.setSelectedCards(selectedCards)}
                    advancedSettings = {this.props.advancedSettings}
                    key={this.state.render}
                >
                </CardPicker>

                <div className="footer">
                    { (this.state.selectedCards.length != this.props.advancedSettings[3]+4 ) ?
                        (
                    <input
                        className="grey"
                        type="button"
                        value={traduction[this.props.language]["PLAY"]}
                        disabled="disabled"
                    />
                        ):(
                            <input
                                className="fullgreen"
                                type="button"
                                value={traduction[this.props.language]["PLAY"]}
                                onClick={() => this.generate()}

                            />
                        )}

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

export default PageCreateChallenge;