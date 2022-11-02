import { Component } from "react";


class History extends Component {
  render() {
    return (

      <div className="mainTab">
        <h2>{this.props.i18n["GAMEHISTORY"]}</h2>

          {this.props.historicalGames.map((hash) => (
            <div key={"#" + hash}>
              <input
                className="button grey"
                type="button"
                value={"#" + hash}
                onClick={() => this.props.loadHistoricalGame("h=" + hash)}
              />
            </div>
          ))}

        <div className="footer">
          <a
              id="homeBut"
              className="backlink"
              type="submit"

          >
            {this.props.i18n["BACKHOME"]}
          </a>
        </div>
      </div>
    );
  }
}

export default History;
