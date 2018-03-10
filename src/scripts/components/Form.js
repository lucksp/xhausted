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
      emailStatus: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
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

  handleInputChange(event) {
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
      return <h1>pending email....</h1>;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="field-set-contact">
          <div className="form-group row">
            <label htmlFor="fromEmail" className="col-sm-3 col-form-label">
              Email
            </label>
            <div className="col-sm-9">
              <input
                name="fromEmail"
                type="email"
                className="form-control form-control-danger"
                id="fromEmail"
                placeholder="Email"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-3 col-form-label">
              Name
            </label>
            <div className="col-sm-9">
              <input
                name="userName"
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Your Name"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className="field-set-vehicle">
          <div className="form-group row">
            <label htmlFor="inputPlate" className="col-sm-3 col-form-label">
              License Plate
            </label>
            <div className="col-sm-9">
              <input
                name="licensePlate"
                type="text"
                className="form-control"
                id="inputPlate"
                placeholder="Vehicle Plate"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputVehicle" className="col-sm-3 col-form-label">
              Vehicle Make/Model
            </label>
            <div className="col-sm-9">
              <input
                name="vehicleType"
                type="text"
                className="form-control"
                id="inputVehicle"
                placeholder="Vehicle Type"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputLocation" className="col-sm-3 col-form-label">
              Location
            </label>
            <div className="col-sm-9">
              <input
                name="vehicleLocation"
                type="text"
                className="form-control"
                id="inputLocation"
                placeholder="Vehicle Location"
                onChange={this.handleInputChange}
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
          <div className="offset-sm-3 col-sm-9">
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
