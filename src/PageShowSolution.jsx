import { Component } from "react";
import "./styles.css";
import "./css/PageShowSolution.css";

import traduction from "./traduction";
import idPage from "./idPage";
import config from "./config";

class PageShowSolution extends Component {
    render() {
        // config
        let folderImagesLaws = config['FOLDER_IMAGES_LAWS'];

        // langcode
        let langcode = traduction[this.props.language]["LANGCODE"];
        if(this.props.language > 1){//force english until we have the images
            langcode = 'EN';
        }

        //code solution
        let codeArr = this.props.game.code.toString().split("");
        // game
        let game = this.props.game;

        // letter listing
        let rows = [];
        for (let i = 0; i < this.props.game.n; i++) {
            rows.push(String.fromCharCode(97 + i));
        }

        return (
            <div className="mainTab showSolution">
                <h2>{traduction[this.props.language]["SOLUTION"]}</h2>
                <div className="content">

                    <span className="bigSquare codeButtonColor0 active">{codeArr[0]}</span>
                    <span className="bigSquare codeButtonColor1 active">{codeArr[1]}</span>
                    <span className="bigSquare codeButtonColor2 active">{codeArr[2]}</span>

                    <div className="verificatorList">
                        {rows.map(function (letter, index) {
                            return (
                                <div key={index} className="row">
                                    <div className="cell first">
                                    <span className="spot">
                                        {letter}
                                    </span>
                                    </div>
                                    <div className="cell">
                                        <img
                                            src={folderImagesLaws +
                                            "/"+langcode+"/"+
                                            game.law[index] +
                                            "_Mini_"+
                                            langcode +
                                            ".jpg"
                                            }
                                        />

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="footer">
                        <a
                            id="homeBut"
                            className="backlink"
                            type="submit"
                            onClick={() => this.props.changePage(idPage["P_INGAME"])}
                        >
                            {traduction[this.props.language]["BACKTOGAME"]}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
export default PageShowSolution;
