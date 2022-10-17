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

    shareToFb(){

        let url = 'https://www.facebook.com/sharer.php?';
        let dynUrl = 'http://elyoukey.com/turingmachine/shareapp/?';
        let sequence = '';
        let seq = '';
        let seqArr = [];
        for(let r=0; r < this.props.finalTab.length ; r++ ){
            seq = '';
            for(let c=0; c < this.props.finalTab[r].length ; c++ ) {
                switch(this.props.finalTab[r][c]){
                    case 1:
                        seq += c+'1';
                        break;
                    case 2:
                        seq += c+'0';
                        break;
                }
            }
            seqArr.push(seq);
        }
        sequence = seqArr.join('_');

        dynUrl += 'pb='+this.props.game.hash.replace(/ /g,"");
        dynUrl += '&daily='+this.props.dailyText;
        dynUrl += '&n='+this.props.game.n;
        dynUrl += '&seq='+sequence;
        dynUrl += '&win='+this.props.winSolo;
        url += 'u='+encodeURIComponent(dynUrl);
        let pop= window.open(url , 'shareFB', 'height=400,menubar=no,width,400');
    }


    render(){
        let className = "shareButton " + ((this.state.copied)?"copied":" ");
        return(
            <div>
                <div
                    className={className}
                    onClick={()=>this.copyToClipboard()}>
                </div>
                <input
                type="button"
                value="share on Facebook"
                onClick={()=>this.shareToFb()}
                />
            </div>

        );
    }
}
export default ShareButton;