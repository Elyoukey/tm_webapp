import React, {Component} from "react";

import "./styles.css";
import "./css/markCell.css";

class MarkCell extends Component{
    state = {
        displayed: false
    };
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleClickOutside(event) {
        if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
            this.setState({displayed:false});
        }
    };
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, true);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, true);
    };

    display(){
        this.setState({displayed:true});
    }

    update(value){
        if(!this.state.displayed)return;
        // call update to pagesoloplay
        this.props.updateFunction(this.props.row,this.props.cell,value);
        this.setState({displayed:false});
    }

    render(){
        let classname = "";
        classname += "markCell "; // generic class
        classname += "state" + this.props.value + " "; // state class
        classname += (this.state.displayed)?"active ": ""; // display class

        return (
            <div
                className={classname}
                ref={this.wrapperRef}
            >
                <div className="holder">
                    <span className="value val0" onClick={( )=>this.update(0)}>&nbsp;</span>
                    <span className="value val1" onClick={( )=>this.update(1)}>&nbsp;</span>
                    <span className="value val2" onClick={( )=>this.update(2)}>&nbsp;</span>
                </div>
                <span className="clicker" onClick={( )=>this.display()}></span>
            </div>
        );
    }
}


export default MarkCell;