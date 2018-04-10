import React, { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);

    // this.state = {
    //   collapse: true
    // };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.activeLink !== nextProps.activeLink;
  }

  toggleCollapse() {
    let menuTarget = document.querySelector(".navbar-toggler");
    if (menuTarget.classList.contains("open")) {
      menuTarget.classList.remove("open");
    } else {
      menuTarget.classList.add("open");
    }
    let el = document.querySelector("#navbarNavAltMarkup");

    if (el.classList.contains("collapse")) {
      el.classList.remove("collapse");
    } else {
      el.classList.add("collapse");
    }
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
      },
      {
        text: "Contact",
        classes: "nav-item nav-link",
        name: "contact"
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
          onClick={event => {
            this.toggleCollapse(event);
          }}
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
