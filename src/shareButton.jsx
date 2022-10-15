import React, {Component} from "react";
import "./css/shareButton.css";
import clipboardOK from "./images/ClipboardOK.png";

class ShareButton extends Component{
    state = {
        copied: false
    };

    copyToClipboard(){
        const el = document.createElement("textarea");
        el.value = this.props.text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        this.setState({copied: true});

    }

    render(){
        let className = "shareButton " + ((this.state.copied)?"copied":" ");
        return(
            <div>
                <div
                    className={className}
                    onClick={()=>this.copyToClipboard()}>
                </div>
            </div>

        );
    }
}
export default ShareButton;