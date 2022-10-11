import { Component } from "react";
import "./styles.css";

import traduction from "./traduction";

class PageLoading extends Component {
  render() {
    return (
      <h2>{traduction[this.props.language]["LOADING"]}</h2>
    );
  }
}

export default PageLoading;
