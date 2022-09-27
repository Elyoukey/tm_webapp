import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

import PageMainPageMainMenu from "./PageMainPageMainMenu";
import PageMainPageOptionMenu from "./PageMainPageOptionMenu";

import history from "./images/History.png";
import logoTM from "./images/Menu.png";

import boxFR from "./images/BOX_FR.jpg";
import boxEN from "./images/BOX_EN.jpg";

const imgBox = [boxFR, boxEN];

class PageMainPage extends Component {
  render() {
    return (
      <table className="mainTab">
        {this.props.landscapeMode
          ? this.renderLandscape()
          : this.renderPortrait()}
      </table>
    );
  }

  renderLandscape() {
    return (
      <tbody>
        <tr>
          <td>
            {this.props.historicalData ? (
              <button
                id="histBut"
                className="smallButton"
                type="submit"
                onClick={() => this.props.changePage(idPage["P_HIST"])}
              >
                <img src={history} width="20" alt="history" />
              </button>
            ) : null}
            <table
              className="mainTabBox"
              style={{
                backgroundImage: `url(${imgBox[this.props.language]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <form onSubmit={() => this.hashGame()}>
                      <img
                        style={{ verticalAlign: "middle" }}
                        alt="logoTM"
                        src={logoTM}
                        width="auto"
                        height="25"
                      />
                      &nbsp;
                      <input
                        className="text"
                        type="text"
                        defaultValue=""
                        placeholder={traduction[this.props.language]["SEARCH"]}
                        size="15"
                        onChange={(e) =>
                          this.props.handleChange(e.target.value)
                        }
                      />
                    </form>
                  </td>
                </tr>
                <tr height="70%">
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <PageMainPageOptionMenu
                      language={this.props.language}
                      swapLanguage={() => this.props.swapLanguage()}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <PageMainPageMainMenu
              language={this.props.language}
              changePage={(value) => this.props.changePage(value)}
              quickGame={() => this.props.quickGame()}
              gameOfTheDay={() => this.props.gameOfTheDay()}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  renderPortrait() {
    return (
      <tbody>
        <tr style={{ height: "50%" }}>
          <td>
            {this.props.historicalData ? (
              <button
                id="histBut"
                className="smallButton"
                type="submit"
                onClick={() => this.props.changePage(idPage["P_HIST"])}
              >
                <img src={history} width="20" alt="history" />
              </button>
            ) : null}
            <table
              className="mainTabBox"
              style={{
                backgroundImage: `url(${imgBox[this.props.language]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <form onSubmit={() => this.hashGame()}>
                      <img
                        style={{ verticalAlign: "middle" }}
                        alt="logoTM"
                        src={logoTM}
                        width="auto"
                        height="25"
                      />
                      &nbsp;
                      <input
                        className="text"
                        type="text"
                        defaultValue=""
                        placeholder={traduction[this.props.language]["SEARCH"]}
                        size="15"
                        onChange={(e) => this.handleChange(e.target.value)}
                      />
                    </form>
                  </td>
                </tr>
                <tr style={{ height: "80%" }}>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr style={{ height: "40%" }}>
          <td>
            <PageMainPageMainMenu
              language={this.props.language}
              changePage={(value) => this.props.changePage(value)}
              quickGame={() => this.props.quickGame()}
              gameOfTheDay={() => this.props.gameOfTheDay()}
            />
          </td>
        </tr>
        <tr style={{ height: "10%" }}>
          <td>
            <PageMainPageOptionMenu
              language={this.props.language}
              swapLanguage={() => this.props.swapLanguage()}
            />
          </td>
        </tr>{" "}
      </tbody>
    );
  }
}

export default PageMainPage;
