import {Component} from "react";
import "./styles.css";
import "./css/codeButton.css";

class CodeButton extends Component{
    render(){
        let classname = "";
        classname += "bigSquare "; // generic class
        classname += "codeButtonColor" + this.props.digit + " "; // color class

        let r = this.props.codeValue.split(""); // active cass
        classname += ( r[this.props.digit] == this.props.number )?"active":"";

        return (
            <span
                className={classname}
                onClick={()=>this.props.setCodeDigit( this.props.digit, this.props.number )}
            >
                {this.props.number}
            </span>);
    }
}


export default CodeButton;