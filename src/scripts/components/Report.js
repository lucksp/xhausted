import React, { Component } from "react";
import Button from "../reusables/Button";
import Form from "./Form";

class Report extends Component {
  constructor(props) {
    super(props);

    this.stateSelected = this.stateSelected.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.resetOnSuccess = this.resetOnSuccess.bind(this);

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

  resetOnSuccess() {
    this.setState({ success: true });
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
        return (
          <Form
            resetOnSuccess={this.resetOnSuccess}
            toEmail={this.state.selectedState.contact.email}
          />
        );
        break;
      case "link":
        return (
          <div className="form-link-wrapper">
            <p className="form-link-text">
              Your State does not accept email submissions. Below is a link to
              their website which has a form that can be completed.
            </p>
            <a
              href={this.state.selectedState.contact.web}
              target="_blank"
              className="link-submit-web"
            >
              Link
            </a>
          </div>
        );
        break;
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
        break;
      default:
        return null;
    }
  }

  render() {
    if (this.state.success) {
      return <h3 className="submit-success">Thank you for submitting!</h3>;
    }
    return (
      <div className="container flex center column report-form">
        <h3>We make it easy to report a smoking vehicle</h3>
        <p>For your safety, please do not use this while driving!</p>
        <div className="form-wrapper flex center column col-sm-8">
          {this.state.data && (
            <div className="dropdown-wrapper">
              <Button
                classes="btn btn-lg btn-green-blue dropdown-state-select"
                buttonClick={this.toggleDropdown}
                text={
                  this.state.selectedState.state
                    ? this.state.selectedState.state
                    : "Select Your State"
                }
                type="button"
              />
              <div
                className={
                  "dropdown-content" +
                  (!this.state.dropdownClose ? " open" : "")
                }
              >
                {Object.keys(this.state.data).map((theState, i) => {
                  return (
                    <a key={i} className="option" onClick={this.stateSelected}>
                      {theState}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
          {this.state.selectedState.state && this.showType()}
        </div>
      </div>
    );
  }
}

export default Report;
