import React, { Component } from "react";
import Button from "../reusables/Button";
import ReportForm from "./ReportForm";

class Content extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.activeComponent !== nextProps.activeComponent;
  }

  render() {
    let content;
    if (this.props.activeComponent === "report") {
      content = <ReportForm />;
    } else if (this.props.activeComponent === "about") {
      content = "Abouting";
    }

    const buttons = [
      {
        value: "Report a Vehicle",
        classes: "btn btn-lg btn-green-blue",
        buttonName: "report"
      },
      {
        value: "About",
        classes: "btn btn-lg btn-green-blue",
        buttonName: "about"
      }
      // {
      //   value: "Contact",
      //   classes: "btn"
      // }
    ];

    let button = buttons.map((button, i) => {
      return (
        <Button
          key={i}
          value={button.value}
          classes={button.classes}
          buttonName={button.buttonName}
          toggleActiveBtn={this.props.toggleActiveBtn}
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
