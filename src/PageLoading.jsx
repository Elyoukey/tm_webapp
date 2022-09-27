import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";

class PageLoading extends Component {
  render() {
    return (
      <table className="mainTab">
        <tbody>
          <tr>
            <td>{traduction[this.props.language]["LOADING"]}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default PageLoading;
