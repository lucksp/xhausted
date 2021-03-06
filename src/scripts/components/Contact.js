import React, { Component } from "react";
import Button from "../reusables/Button";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {
        fromEmail: "",
        userName: "",
        contactInfo: ""
      },
      emailStatus: "",
      okSubmit: {
        fromEmail: null,
        userName: null,
        contactInfo: null
      },
      disabled: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEmailValidate = this.handleEmailValidate.bind(this);
    this.handleTextInputValidate = this.handleTextInputValidate.bind(this);
    this.validateHuman = this.validateHuman.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.emailStatus !== "") return;

    let findFalse = Object.keys(this.state.okSubmit).find(ok => {
      return !this.state.okSubmit[ok];
    });

    if (findFalse) {
      return false;
    }

    this.setState({ emailStatus: "pending" });
    fetch("/api/contact", {
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
        return;
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
    if (event.target.name === "fromEmail") {
      this.handleEmailValidate(event);
    } else if (event.target.type !== "fromEmail") {
      this.handleTextInputValidate(event);
    }

    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newState = { ...this.state.formValues, [name]: value };

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
    if (this.state.emailStatus === "pending") {
      return <div className="loader" />;
    } else if (this.state.emailStatus === "ok") {
      return <h3 className="submit-success">Thank you for submitting!</h3>;
    } else if (this.state.emailStatus === "err") {
      return (
        <h3 className="submit-success">
          There was an error with your request, please submit again.
        </h3>
      );
    }
    return (
      <div className="container flex center column contact-form">
        <form onSubmit={this.handleSubmit}>
          <fieldset className="field-set-contact">
            <div className="form-group row">
              <label htmlFor="fromEmail" className="col-sm-3 col-form-label">
                Email<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-9" +
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
              <label htmlFor="inputName" className="col-sm-3 col-form-label">
                Name<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-9" +
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
          <fieldset className="field-set-contact-data">
            <div className="form-group row">
              <label htmlFor="contactInfo" className="col-sm-3 col-form-label">
                Info<sup className="required">*</sup>
              </label>
              <div
                className={
                  "col-sm-9" +
                  (this.state.okSubmit.contactInfo === true
                    ? " has-success"
                    : this.state.okSubmit.contactInfo === false
                      ? " has-danger"
                      : "")
                }
              >
                <textarea
                  name="contactInfo"
                  type="text"
                  className="form-control"
                  id="contactInfo"
                  placeholder="Comments..."
                  onChange={this.handleInputChange}
                  onBlur={this.handleTextInputValidate}
                />
              </div>
            </div>
          </fieldset>
          <p>And we never save or share your information</p>
          <div className="form-group row">
            <label
              htmlFor="disabledValidation"
              className="col-sm-3 col-form-label"
            >
              Human?
            </label>
            <div
              className={
                "col-sm-9" + (!this.state.disabled ? " has-success" : "")
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
                id="submitForm"
                buttonName={null}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Contact;
