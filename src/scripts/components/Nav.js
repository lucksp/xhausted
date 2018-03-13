import React, { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.activeLink !== nextProps.activeLink;
  }

  render() {
    const links = [
      {
        text: "Report Vehicle",
        classes: "nav-item nav-link",
        name: "report"
      },
      {
        text: "About",
        classes: "nav-item nav-link",
        name: "about"
      }
    ];
    const renderLinks = links.map((link, i) => {
      return (
        <a
          key={i}
          className={
            link.classes +
            (this.props.activeLink === link.name ? " active" : "")
          }
          name={link.name}
          onClick={e => {
            this.props.toggleActiveLink(e.target.name);
          }}
        >
          {link.text}
        </a>
      );
    });
    return (
      <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="/">
          Xhuast'd
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav right">{renderLinks}</div>
        </div>
      </nav>
    );
  }
}
export default Nav;
