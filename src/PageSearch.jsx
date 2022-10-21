import {Component} from "react";
import "./css/PageSearch.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageSearch extends Component {
    render() {
        return (
            <div className="mainTab pageSearch">

                <h2>{traduction[this.props.language]["SEARCH"]}</h2>
                <p>{traduction[this.props.language]["INPUTGAMECODE"]}</p>

                <input
                    type="text"
                    className="bigInput"
                    onChange={(e) => this.props.handleChange(e.target.value)}
                />
                <input
                    type="button"
                    className="fullgreen"
                    value={traduction[this.props.language]["LOAD"]}
                    onClick={() => this.props.hashGame()}
                />
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

export default PageSearch;
