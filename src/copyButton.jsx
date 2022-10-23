import {Component} from "react";
import "./css/copyButton.css";
import "./css/icofonts/icofont.min.css";
import traduction from "./traduction";

class CopyButton extends Component{
    state = {
        copied: false
    };

    copyToClipboard() {
        const el = document.createElement("textarea");
        el.value = this.props.text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        this.setState({copied: true});
    }

    render(){
        let className = "copyButton " + ((this.state.copied)?"copied":" ");
        let classNameIcon = "icon " + ((this.state.copied)?"icofont-copy-invert":"icofont-copy");
        return (
            <div
                className={className}
                onClick={() => this.copyToClipboard()}
            >
                <span className={classNameIcon}></span>
                <span className="text">
                    {(this.state.copied)?traduction[this.props.language]["COPIED"]:traduction[this.props.language]["COPY"]}
                </span>
            </div>
        );
    }
}
export default CopyButton;

