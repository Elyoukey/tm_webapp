import {Component} from "react";
import "./styles.css";

import traduction from "./traduction";

class CriteriaDisplay extends Component{
    render(){

        switch (this.props.game.m)
        {
            case "0":
                return (
                    <div class="criteria">
                        <span
                            className="square green">
                            {this.props.game.ind[this.props.row]}
                        </span>
                    </div>
                );

            case "1":
                return (
                    <div className="criteria">
                        <span
                            className="square green">
                            {this.props.game.ind[this.props.row]}
                        </span>
                        <span
                            className="square green">
                            {this.props.game.fake[this.props.row]}
                        </span>
                    </div>
                );
                break;
            case "2":
                return (
                    <div class="criteria">
                    </div>
                );
        }


    }
}

export default CriteriaDisplay;