import {Component} from "react";
import "./styles.css";
import "./css/PageAreYouSure.css";

import traduction from "./traduction";
import idPage from "./idPage";

class PageAreYouSure extends Component {
    render() {
        return (
            <div className="mainTab">
                <div className={"message"}>


                    <p>{traduction[this.props.language]["SHOW_SOLUTION"]}</p>
                    <div className="radioGroup small">
                        <input
                            type="button"
                            className="fullgreen"
                            value={traduction[this.props.language]["YES"]}
                            onClick={() => this.props.changePage(idPage["P_SOLUTION"])}
                        />
                        <input
                            type="button"
                            className="fullgreen"
                            value={traduction[this.props.language]["NO"]}
                            onClick={() => this.props.changePage(idPage["P_INGAME"])}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

export default PageAreYouSure;
