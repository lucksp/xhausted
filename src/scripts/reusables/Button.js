import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={this.props.classes}
        name={this.props.buttonName ? this.props.buttonName : null}
        id={
          this.props.buttonName ? "button_" + this.props.buttonName : "button"
        }
        role="button"
        onClick={
          this.props.buttonClick
            ? event => {
                this.props.buttonClick(event);
              }
            : null
        }
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
