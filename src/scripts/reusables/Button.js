import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick() {
    this.props.toggleActiveBtn(this.props.buttonName);
  }

  render() {
    return (
      <input
        className={this.props.classes}
        role="button"
        type="button"
        value={this.props.value}
        onClick={this.buttonClick}
      />
    );
  }
}

export default Button;
