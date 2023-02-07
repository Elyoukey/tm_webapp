import React, {Component} from "react";
import "./css/cardPicker.css";

import traduction from "./traduction";
import config from "./config";
import idPage from "./idPage";

class CardPicker extends Component{

    state = {
        open: false,
        selectedCards: [],
        availableCards: [],
        loading: false
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
        this.setState({loading:true});
        this.state.selectedCards.push(cardIndex);
        this.props.setSelectedCards(this.state.selectedCards); //update parent module
        this.call();
    }

    remove( cardIndex ){
        this.setState({loading:true});
        let index = this.state.selectedCards.indexOf(cardIndex);
        this.state.selectedCards.splice(index, 1);
        this.setState(this.state.selectedCards);
        this.call();
    }

    call(){
        var xhr = new XMLHttpRequest();
        var nbCards = this.props.advancedSettings[3]+4;

        xhr.addEventListener("load", () => {
            var data = xhr.responseText;
            var jsonResponse = JSON.parse(data);

            this.setState({availableCards:jsonResponse['c']});
            this.setState({loading:false});
            this.close();

        });
        xhr.addEventListener("error", () => {

        });
        xhr.addEventListener("abort", () => {

        });
        xhr.open(
            "GET",
            config.API+"wizard.php?n=" + nbCards + "&cards=[" + this.state.selectedCards.join(',') + ']'
        );
        xhr.send();
    }

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
                <div class="card" onClick={()=>this.pick(this.state.availableCards[i])}>
                    <div className="holder">
                        <img
                            className="imgCard"
                            src={config.FOLDER_IMAGES_CARDS+langcode + '/TM_GameCards_'+langcode+'-'+ cardNb +'.png'}
                        />
                    </div>
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
                            {this.state.selectedCards.length < this.props.advancedSettings[3]+4 ? (
                            <div
                                className="card openListing"
                                onClick={() =>this.open()}
                            >
                                <label>{traduction[this.props.language]["CLICKTOSELECT"]}</label>
                            </div>
                            ):null}
                        </div>
                    ):(
                        <a className="placeholder" onClick={() =>this.open()}>
                            <label>
                                {traduction[this.props.language]["CHOOSECARDS"]}
                            </label>
                        </a>
                    )}
                </a>
                {this.state.open === true ? (
                    <div class="cardListing">
                        <h1>{traduction[this.props.language]["SELECTCARDS"]}</h1>
                        {availableCardsListing}
                    </div>
                ):null}
                {this.state.loading === true ? (
                    <div class="loader"><h2>{traduction[this.props.language]["LOADING"]}<span>...</span></h2></div>
                ):null}
            </div>
        );
    }
}

export default CardPicker;