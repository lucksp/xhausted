import React, { Component } from "react";
import Jumbo from "./Jumbo";
import Content from "./Content";
import Nav from "./Nav";

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggleActiveLink = this.toggleActiveLink.bind(this);

    this.state = {
      activeLink: "report"
    };
  }

  toggleActiveLink(name) {
    this.setState({ activeLink: name });
  }

  render() {
    return (
      <div className="app-main">
        <Nav
          activeLink={this.state.activeLink}
          toggleActiveLink={this.toggleActiveLink}
        />
        <Jumbo />
        <Content activeLink={this.state.activeLink} />
      </div>
    );
  }
}

export default Home;
