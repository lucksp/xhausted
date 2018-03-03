import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className={this.props.classes}
        name={this.props.buttonName}
        id={"button_" + this.props.buttonName}
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
