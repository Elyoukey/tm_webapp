import React, {Component} from "react";
import "./css/burgerMenu.css";
import traduction from "./traduction";
import idPage from "./idPage";
import config from "./config";
import LanguageMenu from "./LanguageMenu";

class BurgerMenu extends Component{
    state ={
        opened: false
    }
    toggleState(){
        this.setState({opened: !this.state.opened} );
    }
    changePage(p){
        this.setState({opened: false} );
        this.props.changePage(p);
    }
    gameOfTheDay(){
        this.setState({opened: false} );
        this.props.gameOfTheDay();
    }
    render(){
        let className = "burgerMenu " + ((this.state.opened)?"opened":"");
        return(
            <div className={className}>
                <div
                    className="holder"
                    onClick={()=>this.toggleState()}
                >
                    <span className="bar bar1"></span>
                    <span className="bar bar2"></span>
                    <span className="bar bar3"></span>
                </div>
                <div className="container">
                    <LanguageMenu
                        language={this.props.language}
                        swapLanguage={(value) => this.props.swapLanguage(value)}
                    />
                    <input
                        className="green"
                        type="button"
                        value={traduction[this.props.language]["QUICK"]}
                        onClick={() => this.changePage(idPage["P_ADV"])}
                    />
                    <input
                        className="yellow"
                        type="button"
                        value={traduction[this.props.language]["DAY"]}
                        onClick={() => this.gameOfTheDay()}
                    />
                    <input
                        className="blue"
                        type="button"
                        value={traduction[this.props.language]["SEARCH"]}
                        onClick={() => this.changePage(idPage["P_SEARCH"])}
                    />
                    <input
                        className="purple"
                        type="button"
                        value={traduction[this.props.language]["GAMEHISTORY"]}
                        onClick={() => this.changePage(idPage["P_HIST"])}
                    />
                    <a

                        href={config["RULESLINK"]}
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
                </div>
            </div>

        );
    }
}

export default BurgerMenu