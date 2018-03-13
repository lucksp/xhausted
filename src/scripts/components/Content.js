import React, { Component } from "react";
import Button from "../reusables/Button";
import Report from "./Report";

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false
    };

    this.hasSuccess = this.hasSuccess.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeLink === nextProps.activeLink && this.state.success) {
      this.setState({ success: false });
      return true;
    }
  }

  hasSuccess() {
    this.setState({ success: true });
  }

  render() {
    let content;
    if (this.props.activeLink === "report") {
      content = (
        <Report hasSuccess={this.hasSuccess} success={this.state.success} />
      );
    } else if (this.props.activeLink === "about") {
      content = "Abouting";
    }

    return (
      <section className="section-content">
        <div className="content">{content}</div>
      </section>
    );
  }
}

export default Content;
