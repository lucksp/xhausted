import React, { Component } from "react";
import Jumbo from "./Jumbo";
import Content from "./Content";

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggleActiveBtn = this.toggleActiveBtn.bind(this);

    this.state = {
      activeBtn: "report"
    };
  }

  toggleActiveBtn(btn) {
    this.setState({ activeBtn: btn });
  }

  render() {
    return (
      <div>
        <Jumbo />
        <Content
          activeComponent={this.state.activeBtn}
          toggleActiveBtn={this.toggleActiveBtn}
        />
      </div>
    );
  }
}

export default Home;
