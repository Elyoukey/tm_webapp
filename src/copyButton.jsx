import {Component} from "react";
import "./css/copyButton.css";
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
        return (
            <span className={className}>
                <input
                    type="button"
                    value={traduction[this.props.language]["COPY"]}
                    className="fullblack copy inline"
                    onClick={() => this.copyToClipboard()}
                />
            </span>
        );
    }
}
export default CopyButton;

