import {Component} from "react";
import "./styles.css";

import traduction from "./traduction";
import idPage from "./idPage";

import home from "./images/Home.png";

class PageError extends Component {
    render() {
        return (
            <div className="mainTab">
                <h2>&nbsp;</h2>
                <span className="error">
                  {traduction[this.props.language]["ERROR_UNABLE"]}
                </span>
                <input
                    className="fullgreen"
                    type="button"
                    value={traduction[this.props.language]["BACK"]}
                    onClick={() => this.props.changePage(idPage["P_SEARCH"])}
                />
            </div>
        );
    }
}

export default PageError;
