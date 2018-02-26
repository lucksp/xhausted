import React, { Component } from "react";
import Button from "../reusables/Button";
import Form from "./Form";

class Report extends Component {
  constructor(props) {
    super(props);

    this.stateSelected = this.stateSelected.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      selectedState: {
        state: "",
        contact: null
      },
      dropdownClose: true,
      data: null
    };
  }

  //TODO - add " has-danger" class to "form-group" elements that need to be required on submit

  componentWillMount() {
    this.fetchData();
  }

  submitForm() {
    debugger;
  }

  stateSelected({ currentTarget }) {
    let stateSelected = {
      state: currentTarget.text,
      contact: this.state.data[currentTarget.text]
    };

    let showType;
    if (stateSelected.contact.email) {
      showType = "form";
    } else if (!stateSelected.contact.email && stateSelected.contact.web) {
      showType = "link";
    } else if (stateSelected.contact.noStandards) {
      showType = "none";
    }

    var t = showType;
    this.setState({
      selectedState: stateSelected,
      dropdownClose: !this.state.dropdownClose,
      showType: showType
    });
  }

  toggleDropdown() {
    this.setState({ dropdownClose: !this.state.dropdownClose });
  }

  fetchData() {
    fetch("/api/data")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ data: json });
      })
      .catch(error => {
        console.log(error);
      });
  }

  showType() {
    switch (this.state.showType) {
      case "form":
        return <Form />;
      case "link":
        return (
          <div>
            <h5>
              Your State does not have any email contact. We will direct you to
              their website which has a form that can be completed.
            </h5>
          </div>
        );
      case "none":
        return (
          <h5>
            Unfortunately, your State does not have any contact information
            available &/or does not have any emissions standards to require this
            type of information be submitted about its vehicles. We apologize
            for the inconvenience. We always recommends reaching out to your
            local State Environmental or Public Health departments if you have
            any questions.
          </h5>
        );
      default:
        return null;
    }
  }

  render() {
    let showHere = this.showType();

    return (
      <div className="container flex center column report-form">
        <h3>We make it easy to report a smoking vehicle</h3>
        <p>For your safety, please do not use this while driving!</p>
        <div className="form-wrapper col-sm-8">
          {this.state.data && (
            <div className="dropdown-wrapper">
              <button
                className="btn btn-lg btn-green-blue button-state-select"
                onClick={this.toggleDropdown}
              >
                {this.state.selectedState.state
                  ? this.state.selectedState.state
                  : "Select Your State"}
              </button>
              <div
                className={
                  "dropdown-content" +
                  (!this.state.dropdownClose ? " open" : "")
                }
              >
                {Object.keys(this.state.data).map((state, i) => {
                  return (
                    <a key={i} className="option" onClick={this.stateSelected}>
                      {state}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
          {showHere}
        </div>
      </div>
    );
  }
}

export default Report;
