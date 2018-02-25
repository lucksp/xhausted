import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={this.props.classes}
        role="button"
        onClick={e => {
          this.props.buttonClick(this.props.buttonName);
        }}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
