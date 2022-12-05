import React, { Component } from "react";

import boxFR from "../images/BOX_FR.png";
import boxEN from "../images/BOX_EN.png";
import logoSM from "../images/logo_sm.png";
import config from "../config";

const imgBox = {
    'FR':boxFR,
    'EN':boxEN
};

class MainPage extends Component {
    render() {
        return (
            <div className="mainTab">
                <img
                    className="mainPageImage"
                    src={imgBox[this.props.i18n["LANGCODE"]]}
                />
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
                        value={this.props.i18n["SEARCH"]}
                    />
                    <input
                        className="purple homeButton"
                        type="button"
                        value={this.props.i18n["GAMEHISTORY"]}
                    />
                    <a

                        href={config["RULESLINK"]+"rules_"+this.props.i18n["LANGCODE"]+".pdf"}
                        target="_blank"
                    >
                        {this.props.i18n["DOWNLOADRULES"]}
                    </a>
                    <a
                        href={config["NOTESHEETLINK"]}
                        target="_blank"
                    >
                        {this.props.i18n["SHEET"]}
                    </a>
                    <a
                        href={this.props.i18n["ABOUTLINK"]}
                        target="_blank"
                    >
                        {this.props.i18n["ABOUT"]}
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
