import {Component} from "react";
import "./styles.css";
import "./css/LanguageMenu.css";

import traduction from "./traduction";

class LanguageMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggle: false};
    }

    toggleLanguage() {
        this.setState({isToggle: !this.state.isToggle});
    }

    swapLanguage(langCode){
        this.props.swapLanguage(langCode);
        this.setState({isToggle: false});

    }

    render() {
        return (
            <div className="lang-switch">
                <a id="imageDropdown" onClick={() => this.toggleLanguage()}>
                    { traduction[this.props.language]["LANG"] }
                </a>
                <div id="lang-list" className="lang-list" style={{display: this.state.isToggle ? 'block' : 'none'}}>
                    {this.props.language!==0?(<a onClick={() => this.swapLanguage(0)}>{traduction[0]["LANG"]}</a>):null}
                    {this.props.language!==1?(<a onClick={() => this.swapLanguage(1)}>{traduction[1]["LANG"]}</a>):null}
                    {this.props.language!==2?(<a onClick={() => this.swapLanguage(2)}>{traduction[2]["LANG"]}</a>):null}
                    {this.props.language!==3?(<a onClick={() => this.swapLanguage(3)}>{traduction[3]["LANG"]}</a>):null}
                    {this.props.language!==4?(<a onClick={() => this.swapLanguage(4)}>{traduction[4]["LANG"]}</a>):null}
                    {this.props.language!==5?(<a onClick={() => this.swapLanguage(5)}>{traduction[5]["LANG"]}</a>):null}
                </div>
            </div>
        );
    }
}

export default LanguageMenu;
