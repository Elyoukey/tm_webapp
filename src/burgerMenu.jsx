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
                        className="green homeButton"
                        type="button"
                        value={traduction[this.props.language]["QUICK"]}
                        onClick={() => this.changePage(idPage["P_ADV"])}
                    />
                    <input
                        className="yellow homeButton"
                        type="button"
                        value={traduction[this.props.language]["DAiLYCHALLENGE"]}
                        onClick={() => this.gameOfTheDay()}
                    />
                    <input
                        className="blue homeButton"
                        type="button"
                        value={traduction[this.props.language]["SEARCH"]}
                        onClick={() => this.changePage(idPage["P_SEARCH"])}
                    />
                    <input
                        className="purple homeButton"
                        type="button"
                        value={traduction[this.props.language]["GAMEHISTORY"]}
                        onClick={() => this.changePage(idPage["P_HIST"])}
                    />
                </div>
                <div className="overlay" onClick={()=>this.toggleState()}></div>
            </div>

        );
    }
}

export default BurgerMenu