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
                    <a
                        className="green button homeButton"
                        onClick={() => this.props.changePage(idPage["P_ADV"])}
                    >
                        {traduction[this.props.language]["QUICK"]}
                    </a>
                    <a
                        className="orange button homeButton"
                        onClick={() => this.props.changePage(idPage["P_CREATECHALLENGE"])}
                    >
                        {traduction[this.props.language]["CREATECHALLENGE"]}
                    </a>
                    <a
                        className="yellow button homeButton"
                        onClick={() => this.props.gameOfTheDay()}

                    >
                        {traduction[this.props.language]["DAiLYCHALLENGE"]}
                    </a>
                    <a
                        className="blue button homeButton"
                        onClick={() => this.props.changePage(idPage["P_SEARCH"])}

                    >
                        {traduction[this.props.language]["SEARCH"]}
                    </a>
                    <a
                        className="purple button homeButton"
                        onClick={() => this.props.changePage(idPage["P_HIST"])}
                    >
                        {traduction[this.props.language]["GAMEHISTORY"]}
                    </a>
                </div>
                <div className="overlay" onClick={()=>this.toggleState()}></div>
            </div>

        );
    }
}

export default BurgerMenu