import React, { Component } from "react";
import Button from "../reusables/Button";

class ReportForm extends Component {
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

    this.setState({
      selectedState: stateSelected,
      dropdownClose: !this.state.dropdownClose
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

  render() {
    const showForm =
      this.state.selectedState.state && this.state.selectedState.contact.email;
    const showLink =
      this.state.selectedState.state &&
      !this.state.selectedState.contact.email &&
      this.state.selectedState.contact.web;
    const showEmpty =
      this.state.selectedState.state &&
      this.state.selectedState.contact.noStandards;

    const buttons = [
      {
        text: "Submit",
        classes: "btn btn-lg btn-green-blue",
        buttonName: "submit",
        buttonType: "submit"
      }
    ];

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
          {showForm ? (
            <form>
              <fieldset className="field-set-contact">
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-3 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control form-control-danger"
                      id="inputEmail"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputName"
                    className="col-sm-3 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="field-set-vehicle">
                <div className="form-group row">
                  <label
                    htmlFor="inputPlate"
                    className="col-sm-3 col-form-label"
                  >
                    License Plate
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPlate"
                      placeholder="Vehicle Plate"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputVehicle"
                    className="col-sm-3 col-form-label"
                  >
                    Vehicle Make/Model
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputVehicle"
                      placeholder="Vehicle Plate"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="field-set-other">
                <div className="form-group row">
                  <label className="col-sm-4">Submit as Anonymous??</label>
                  <div className="col-sm-8">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" />{" "}
                        Yes
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4">Receive a Copy?</label>
                  <div className="col-sm-8">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" />{" "}
                        Yes
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <p>And we never save or share your information</p>
              <div className="form-group row">
                <div className="offset-sm-3 col-sm-9">
                  <Button
                    text={buttons[0].text}
                    classes={buttons[0].classes}
                    buttonName={buttons[0].buttonName}
                    buttonClick={this.submitForm}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          ) : showLink ? (
            <h1>link</h1>
          ) : (
            showEmpty && <h1>nada</h1>
          )}
        </div>
      </div>
    );
  }
}

export default ReportForm;
