import React, { Component } from "react";
import Button from "../reusables/Button";

import DayPickerInput from "react-day-picker/DayPickerInput";

import format from "date-fns/format";
import parse from "date-fns/parse";

import "react-day-picker/lib/style.css";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      formValues: {
        toEmail: this.props.toEmail,
        date: "",
        fromEmail: "",
        userName: "",
        licensePlate: "",
        vehicleType: "",
        vehicleLocation: "",
        engineType: "",
        anonymous: "",
        sendCopy: true
      },
      emailStatus: "",
      okSubmit: {
        fromEmail: null,
        userName: null,
        licensePlate: null,
        vehicleType: null,
        vehicleLocation: null
      },
      disabled: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEmailValidate = this.handleEmailValidate.bind(this);
    this.handleTextInputValidate = this.handleTextInputValidate.bind(this);
    this.validateHuman = this.validateHuman.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.form = null;
    this.setRef = element => {
      this.form = element;
    };
  }

  componentDidMount() {
    let DayPickerInput = document
      .querySelector(".DayPickerInput input")
      .classList.add("form-control");

    if (this.form) {
      this.form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.emailStatus !== "") return;

    let findFalse = Object.keys(this.state.okSubmit).find(ok => {
      return !this.state.okSubmit[ok];
    });

    if (findFalse) {
      this.setState({
        okSubmit: { ...this.state.okSubmit, [findFalse]: false }
      });
      return false;
    }

    this.setState({ emailStatus: "pending" });
    fetch("/api/sendData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("error");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ emailStatus: "ok" });
        this.props.hasSuccess();
      })
      .catch(err => {
        this.setState({ emailStatus: "err" });
        console.warn("Error sending email", err);
        return;
      });
  }

  handleEmailValidate(event) {
    const regex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)/;

    let valid = regex.test(event.target.value);

    this.setState({
      okSubmit: { ...this.state.okSubmit, [event.target.name]: valid }
    });
  }

  handleTextInputValidate(event) {
    let valid = false;
    if (event.target.value.length) {
      valid = true;
    }

    this.setState({
      okSubmit: { ...this.state.okSubmit, [event.target.name]: valid }
    });
  }

  handleInputChange(event) {
    let value;
    const name = event.target.name;

    if (event.target.type === "text" || event.target.type === "email") {
      value = event.target.value;
    } else if (event.target.type === "option") {
      value = event.target.text;
      this.toggleDropdown();
    } else if (event.target.type === "checkbox") {
      value = event.target.checked;
    }

    if (event.target.type === "email") {
      this.handleEmailValidate(event);
    } else if (event.target.type === "text") {
      this.handleTextInputValidate(event);
    }

    const newState = { ...this.state.formValues, [name]: value };

    this.setState({
      formValues: newState
    });
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  handleDatePicker(day) {
    let formattedDate = new Date(day).toLocaleDateString();

    const newState = {
      ...this.state.formValues,
      date: formattedDate
    };

    this.setState({
      formValues: newState
    });
  }

  validateHuman(e) {
    if (e.target.value === "9") {
      this.setState({ disabled: false });
    }
  }

  render() {
    const buttons = [
      {
        text: "Submit",
        classes:
          "btn btn-lg btn-green-blue" +
          (this.state.disabled ? " disabled" : ""),
        buttonName: "submit",
        buttonType: "submit"
      }
    ];
    const engineDrops = {
      Gasoline: "enabled",
      Diesel: "enabled"
    };
    if (this.state.emailStatus === "pending") {
      return <div className="loader" />;
    }
    return (
      //TODO - add Description of emissions (black smoke, grey smoke, quantity of smoke, and when was the most smoke was observed – moving from a stop or while in motion traveling down the road, or at idle). About how long did the emissions last during observation (was it continuous, or heavier initially)
      <div ref={this.setRef}>
        <form className="form-wrapper">
          <fieldset className="field-set-contact">
            <div className="form-group row">
              <label htmlFor="fromEmail" className="col-sm-4 col-form-label">
                Email<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-8" +
                  (this.state.okSubmit.fromEmail === true
                    ? " has-success"
                    : this.state.okSubmit.fromEmail === false
                      ? " has-danger"
                      : "")
                }
              >
                <input
                  name="fromEmail"
                  type="email"
                  className="form-control"
                  id="fromEmail"
                  placeholder="Email"
                  onChange={this.handleInputChange}
                  onBlur={this.handleEmailValidate}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputName" className="col-sm-4 col-form-label">
                Name<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-8" +
                  (this.state.okSubmit.userName === true
                    ? " has-success"
                    : this.state.okSubmit.userName === false
                      ? " has-danger"
                      : "")
                }
              >
                <input
                  name="userName"
                  type="text"
                  className="form-control"
                  id="inputName"
                  placeholder="Your Name"
                  onChange={this.handleInputChange}
                  onBlur={this.handleTextInputValidate}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="field-set-vehicle">
            <div className="form-group row">
              <label htmlFor="inputPlate" className="col-sm-4 col-form-label">
                License Plate<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-8" +
                  (this.state.okSubmit.licensePlate === true
                    ? " has-success"
                    : this.state.okSubmit.licensePlate === false
                      ? " has-danger"
                      : "")
                }
              >
                <input
                  name="licensePlate"
                  type="text"
                  className="form-control"
                  id="inputPlate"
                  placeholder="Vehicle Plate"
                  onChange={this.handleInputChange}
                  onBlur={this.handleTextInputValidate}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputVehicle" className="col-sm-4 col-form-label">
                Vehicle Make/Model<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-8" +
                  (this.state.okSubmit.vehicleType === true
                    ? " has-success"
                    : this.state.okSubmit.vehicleType === false
                      ? " has-danger"
                      : "")
                }
              >
                <input
                  name="vehicleType"
                  type="text"
                  className="form-control"
                  id="inputVehicle"
                  placeholder="Vehicle Type"
                  onChange={this.handleInputChange}
                  onBlur={this.handleTextInputValidate}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="inputLocation"
                className="col-sm-4 col-form-label"
              >
                Location<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-8" +
                  (this.state.okSubmit.vehicleLocation === true
                    ? " has-success"
                    : this.state.okSubmit.vehicleLocation === false
                      ? " has-danger"
                      : "")
                }
              >
                <input
                  name="vehicleLocation"
                  type="text"
                  className="form-control"
                  id="inputLocation"
                  placeholder="Vehicle Location"
                  onChange={this.handleInputChange}
                  onBlur={this.handleTextInputValidate}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="engineType" className="col-sm-4 col-form-label">
                Engine
              </label>
              <div className="dropdown-wrapper col-sm-8">
                <Button
                  buttonName="engine"
                  classes="btn btn-fine btn-gray dropdown-select button-engine"
                  buttonClick={this.toggleDropdown}
                  text={
                    this.state.formValues.engineType
                      ? this.state.formValues.engineType
                      : "Select Your Engine"
                  }
                  type="button"
                />
                {this.state.dropdownOpen && (
                  <div className={"dropdown-content engine"}>
                    {Object.keys(engineDrops).map((name, i) => {
                      return (
                        <a
                          type="option"
                          key={i}
                          name="engineType"
                          className="option"
                          onClick={this.handleInputChange}
                        >
                          {name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputDate" className="col-sm-4 col-form-label">
                Date
              </label>
              <div className="col-sm-8">
                <DayPickerInput
                  className="form-control"
                  format="M/D/YYYY"
                  placeholder="MM/DD/YYYY"
                  name="date"
                  className="form-control"
                  onDayChange={day => {
                    this.handleDatePicker(day);
                  }}
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
                    <input
                      name="anonymous"
                      className="form-check-input"
                      id="inputAnonymous"
                      type="checkbox"
                      onChange={this.handleInputChange}
                    />{" "}
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
                    <input
                      name="sendCopy"
                      className="form-check-input"
                      id="inputReceiveCopy"
                      type="checkbox"
                      checked={this.state.formValues.sendCopy}
                      onChange={this.handleInputChange}
                    />{" "}
                    Yes
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          <p>And we never save or share your information</p>
          <div className="form-group row">
            <label
              htmlFor="disabledValidation"
              className="col-sm-4 col-form-label"
            >
              Human?
            </label>
            <div
              className={
                "col-sm-8" + (!this.state.disabled ? " has-success" : "")
              }
            >
              <input
                name="vehicleLocation"
                type="text"
                className="form-control"
                id="disabledValidation"
                placeholder="4 + 5 = ?"
                onChange={this.validateHuman}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 flex center">
              <Button
                text={buttons[0].text}
                classes={buttons[0].classes}
                ibuttonName="submitForm"
                buttonName={null}
                type="button"
                buttonClick={this.handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
