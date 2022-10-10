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
                    <a onClick={() => this.swapLanguage(0)}>Français</a>
                    <a onClick={() => this.swapLanguage(1)}>English</a>
                </div>
            </div>
        );
    }
}

export default LanguageMenu;
