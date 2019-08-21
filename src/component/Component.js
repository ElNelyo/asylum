import React from "react";
import ReactDOM from 'react-dom';


class HelloMessage extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "Salut ",
      this.props.name
    );
  }
}


export default HelloMessage;