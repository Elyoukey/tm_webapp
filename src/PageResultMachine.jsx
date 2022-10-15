import { Component } from "react";
import "./styles.css";
import "./css/PageResultMachine.css";

import traduction from "./traduction";
import idPage from "./idPage";

import appface0 from "./images/appface0.png";
import appface1 from "./images/appface1.png";

class PageResultMachine extends Component {

    render() {
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


                <pre>
                     {this.props.socialTXT}
                </pre>
                <div className="separator"></div>
<p>Invitez vous amis à réaliser ce probleme</p>
                <h2>
                    {"#" + this.props.game.hash}
                    <input
                        type="button"
                        value="copy"
                        className="fullblack copy inline"
                        onClick={() => this.props.copyToClipboard()}
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