import React, { Component } from "react";
import "./styles.css";
import "./css/PageMainPage.css";

import traduction from "./traduction";
import idPage from "./idPage";

import LanguageMenu from "./LanguageMenu";

import history from "./images/History.png";
import logoTM from "./images/Menu.png";

import boxFR from "./images/BOX_FR.png";
import boxEN from "./images/BOX_EN.png";
import logoSM from "./images/logo_sm.png";
import home from "./images/Home.png";
import config from "./config";

const imgBox = [boxFR, boxEN];

class PageMainPage extends Component {
  render() {
    return (
        <div className="mainTab">
          <img
              className="mainPageImage"
              src={imgBox[this.props.language]}
          />
          <div className="homePage">
            <input
                className="green homeButton"
                type="button"
                value={traduction[this.props.language]["QUICK"]}
                onClick={() => this.props.changePage(idPage["P_ADV"])}
                style={{fontSize: this.props.sizeFont}}
            />
            <input
                className="yellow homeButton"
                type="button"
                value={traduction[this.props.language]["DAiLYCHALLENGE"]}
                onClick={() => this.props.gameOfTheDay()}
                style={{fontSize: this.props.sizeFont}}
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
                      <a href="https://www.youtube.com/scorpionmasque" target="_blank" className="icofont-youtube"></a>
                  </div>

                 Copyright &copy; 2022 - Le Scorpion Masqué
              </div>


          </div>
        </div>
    );
  }
}

export default PageMainPage;
