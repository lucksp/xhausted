import React, { Component } from "react";
import Button from "../reusables/Button";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        toEmail: this.props.toEmail,
        fromEmail: "",
        userName: "",
        licensePlate: "",
        vehicleType: "",
        vehicleLocation: "",
        anonymous: "",
        sendCopy: true
      },
      emailStatus: "",
      okSubmit: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEmailValidate = this.handleEmailValidate.bind(this);
    this.handleTextInputValidate = this.handleTextInputValidate.bind(this);
  }

  handleSubmit(event) {
    if (this.state.emailStatus !== "") return;
    if (!Object.keys(this.state.okSubmit).length) return false;

    let findFalse;
    Object.keys(this.state.okSubmit).find(ok => {
      if (this.state.okSubmit[ok] === false) {
        findFalse = true;
        return;
      }
    });

    if (findFalse) {
      event.preventDefault();
      return false;
    }

    console.log("setState pending");
    this.setState({ emailStatus: "pending" });
    event.preventDefault();
    fetch("/api/sendData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.formValues)
    })
      .then(response => {
        console.log("server response", response);
        if (response.status >= 400) {
          throw new Error("error");
        }
        return response.json();
      })
      .then(data => {
        console.log("setState ok");
        this.setState({ emailStatus: "ok" });
        this.props.resetOnSuccess();
        console.log("then data: ", data);
      })
      .catch(err => {
        console.log("setState err");
        this.setState({ emailStatus: "err" });
        console.warn("Error sending email", err);
        return;
      });
  }

  handleEmailValidate(event) {
    const regex = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)/;

    let valid = regex.test(event.target.value);

    const newState = {
      ...this.state.okSubmit,
      validEmail: valid
    };
    this.setState({
      okSubmit: newState
    });
  }

  handleTextInputValidate(event) {
    let inputStateName =
      "valid" +
      event.target.name.charAt(0).toUpperCase() +
      event.target.name.slice(1);

    let valid = false;
    if (event.target.value.length) {
      valid = true;
    }
    const newState = {
      ...this.state.okSubmit,
      [inputStateName]: valid
    };
    this.setState({
      okSubmit: newState
    });
  }

  handleInputChange(event) {
    if (event.target.name === "fromEmail") {
      this.handleEmailValidate(event);
    } else if (event.target.type === "text") {
      this.handleTextInputValidate(event);
    }

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    const newState = { ...this.state.formValues, [name]: value };

    this.setState({
      formValues: newState
    });
  }

  render() {
    const buttons = [
      {
        text: "Submit",
        classes: "btn btn-lg btn-green-blue",
        buttonName: "submit",
        buttonType: "submit"
      }
    ];
    if (this.state.emailStatus === "pending") {
      return <div className="loader" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="field-set-contact">
          <div className="form-group row">
            <label htmlFor="fromEmail" className="col-sm-3 col-form-label">
              Email
            </label>
            <div
              className={
                "col-sm-9" +
                (this.state.okSubmit.validEmail === true
                  ? " has-success"
                  : this.state.okSubmit.validEmail === false
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
            <label htmlFor="inputName" className="col-sm-3 col-form-label">
              Name
            </label>
            <div
              className={
                "col-sm-9" +
                (this.state.okSubmit.validUserName === true
                  ? " has-success"
                  : this.state.okSubmit.validUserName === false
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
            <label htmlFor="inputPlate" className="col-sm-3 col-form-label">
              License Plate
            </label>
            <div
              className={
                "col-sm-9" +
                (this.state.okSubmit.validLicensePlate === true
                  ? " has-success"
                  : this.state.okSubmit.validLicensePlate === false
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
            <label htmlFor="inputVehicle" className="col-sm-3 col-form-label">
              Vehicle Make/Model
            </label>
            <div
              className={
                "col-sm-9" +
                (this.state.okSubmit.validVehicleType === true
                  ? " has-success"
                  : this.state.okSubmit.validVehicleType === false
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
            <label htmlFor="inputLocation" className="col-sm-3 col-form-label">
              Location
            </label>
            <div
              className={
                "col-sm-9" +
                (this.state.okSubmit.validVehicleLocation === true
                  ? " has-success"
                  : this.state.okSubmit.validVehicleLocation === false
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
          <div className="col-sm-12 flex center">
            <Button
              text={buttons[0].text}
              classes={buttons[0].classes}
              id="submitForm"
              buttonName={null}
              type="submit"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
