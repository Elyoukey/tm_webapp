import React, { Component } from "react";

import traduction from "../traduction";

import boxFR from "../images/BOX_FR.png";
import boxEN from "../images/BOX_EN.png";
import logoSM from "../images/logo_sm.png";
import home from "../images/Home.png";
import config from "../config";
import idPage from "../idPage";

const imgBox = [boxFR, boxEN];

class MainPage extends Component {
    render() {
        return (
            <div className="mainTab">

                <div className="homePage">
                    <input
                        className="green homeButton"
                        type="button"
                        value={this.props.i18n["QUICK"]}
                    />
                    <input
                        className="yellow homeButton"
                        type="button"
                        value={this.props.i18n["DAiLYCHALLENGE"]}
                    />
                    <input
                        className="blue homeButton"
                        type="button"
                        value={traduction[this.props.language]["SEARCH"]}
                        onClick={() => this.props.changePage(idPage["P_SEARCH"])}
                        style={{
                            fontSize: this.props.sizeFont
                        }}
                    />
                    <input
                        className="purple homeButton"
                        type="button"
                        value={traduction[this.props.language]["GAMEHISTORY"]}
                        onClick={() => this.props.changePage(idPage["P_HIST"])}
                        style={{
                            fontSize: this.props.sizeFont
                        }}
                    />
                    <a

                        href={config["RULESLINK"]+"rules_"+traduction[this.props.language]["LANGCODE"]+".pdf"}
                        target="_blank"
                    >
                        {traduction[this.props.language]["DOWNLOADRULES"]}
                    </a>
                    <a
                        href={config["NOTESHEETLINK"]}
                        target="_blank"
                    >
                        {traduction[this.props.language]["SHEET"]}
                    </a>
                    <a
                        href={traduction[this.props.language]["ABOUTLINK"]}
                        target="_blank"
                    >
                        {traduction[this.props.language]["ABOUT"]}
                    </a>
                    <div className="separator"></div>

                    <div className="clearfix"></div>
                    <div className="socialLinks">
                        <a href="https://www.scorpionmasque.com" target="_blank">
                            <img className="logo_SM"
                                 src={logoSM}
                                 alt="Scorpion masqué"/>
                        </a>
                        <div className="social">
                            <a href="https://www.instagram.com/scorpionmasque/" target="_blank" className="icofont-instagram"></a>
                            <a href="https://twitter.com/Scorpionmasque" target="_blank" className="icofont-twitter"></a>
                            <a href="https://www.facebook.com/scorpionmasque" target="_blank" className="icofont-facebook"></a>
                            <a href="https://www.youtube.com/user/LeScorpionmasque" target="_blank" className="icofont-youtube"></a>
                        </div>

                        Copyright &copy; 2022 - Le Scorpion Masqué
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
