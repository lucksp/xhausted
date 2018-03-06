import React, { Component } from "react";
import Button from "../reusables/Button";
import Report from "./Report";

class Content extends Component {
  constructor(props) {
    super(props);

    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(e) {
    this.props.toggleActiveBtn(e.target.name);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.activeComponent !== nextProps.activeComponent;
  }

  render() {
    let content;
    if (this.props.activeComponent === "report") {
      content = <Report />;
    } else if (this.props.activeComponent === "about") {
      content = "Abouting";
    }

    const buttons = [
      {
        text: "Report a Vehicle",
        classes: "btn btn-lg btn-green-blue",
        buttonName: "report",
        buttonType: "button"
      },
      {
        text: "About",
        classes: "btn btn-lg btn-green-blue",
        buttonName: "about",
        buttonType: "button"
      }
    ];

    let button = buttons.map((button, i) => {
      return (
        <Button
          key={i}
          text={button.text}
          classes={button.classes}
          buttonName={button.buttonName}
          buttonClick={this.buttonClick}
          type={button.buttonType}
        />
      );
    });

    return (
      <section>
        <div className="button_group flex center">{button}</div>
        <div className="content">{content}</div>
      </section>
    );
  }
}

export default Content;
