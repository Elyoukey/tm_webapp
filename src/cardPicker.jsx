import React, {Component} from "react";
import "./css/cardPicker.css";

import traduction from "./traduction";
import idPage from "./idPage";

class CardPicker extends Component{

    state = {
        open: "false"
    }
    open(){ this.setState({open:true});}
    close(){ this.setState({open:false});}

    pick(){}
    submit(){}

    render(){
        return(
            <div class="cardpicker">
                <a
                    class="cardList"
                    onClick={() =>this.open()}
                >
                    <div class="placeholder">{traduction[this.props.language]["CHOOSECARDS"]}</div>
                </a>
                {this.state.open === true ? (
                <div class="cardListing">
                    Séleectionner les carts critères ici bbb
                    <div class="cardpickerFooter">
                        Nombre de cartes selectionnées
                        1 2 3 4
                        <input
                            className="fullgreen"
                            type="button"
                            value={traduction[this.props.language]["CONFIRM"]}
                            onClick={() => this.close()}
                        />
                    </div>
                </div>
                ):null}
            </div>
        );
    }
}

export default CardPicker;