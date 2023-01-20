import React, {Component} from "react";
import "./css/cardPicker.css";

import traduction from "./traduction";
import config from "./config";

class CardPicker extends Component{

    state = {
        open: "false",
        selectedCards: [12,23,8],
        availableCards: []
    }

    constructor(props){
        super(props);
        for(let i=1;i<=48;i++){
            let cards = this.state.availableCards;
            cards.push(i);
            this.setState({availableCards:cards});
        }
    }
    open(){ this.setState({open:true});}
    close(){ this.setState({open:false});}

    pick( cardIndex ){
        this.state.selectedCards.push(cardIndex);
        this.close();
    }

    remove( cardIndex ){
        let index = this.state.selectedCards.indexOf(cardIndex);
        console.log(index);
        this.state.selectedCards.splice(index, 1);
        this.setState(this.state.selectedCards);
    }
    submit(){}

    render(){
        var langcode = traduction[this.props.language]["LANGCODE"];

        var selectedCardsListing = [];

        for(let i=0;i<this.state.selectedCards.length;i++){
            let cardNb = this.state.selectedCards[i].toString().padStart(2,'0');

            selectedCardsListing.push(
                <div class="card" id="card">
                    <img
                        className="imgCard"
                        src={config.FOLDER_IMAGES_CARDS+langcode + '/TM_GameCards_'+langcode+'-'+ cardNb +'.png'}
                    />
                    <div className="cardRemove" onClick={() => this.remove(this.state.selectedCards[i])}>
                        &times;
                    </div>
                </div>
            );
        }

        var availableCardsListing = [];
        for(let i=0;i<this.state.availableCards.length;i++){
            let cardNb = this.state.availableCards[i].toString().padStart(2,'0');

            availableCardsListing.push(
                <div class="card" id="card">
                    <img
                        className="imgCard"
                        src={config.FOLDER_IMAGES_CARDS+langcode + '/TM_GameCards_'+langcode+'-'+ cardNb +'.png'}
                    />
                    <div  class="cardCheckbox" onClick={()=>this.pick(this.state.availableCards[i])}>{cardNb}</div>
                </div>
            );
        }

        return(
            <div class="cardpicker">

                <a
                    class="cardList"
                >
                    {this.state.selectedCards.length > 0 ? (
                        <div >
                            {selectedCardsListing}
                            <div
                                className="card"
                                onClick={() =>this.open()}
                            >{traduction[this.props.language]["CHOOSECARDS"]}</div>
                        </div>
                    ):(
                        <a className="placeholder" onClick={() =>this.open()}>{traduction[this.props.language]["CHOOSECARDS"]}</a>
                    )}
                </a>
                {this.state.open === true ? (
                    <div class="cardListing">
                        <h1>{traduction[this.props.language]["SELECTCARDS"]}</h1>
                        {availableCardsListing}

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