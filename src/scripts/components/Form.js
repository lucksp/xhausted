import React, { Component } from "react";
import Button from "../reusables/Button";

class Form extends Component {
  constructor(props) {
    super(props);
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
    return (
      <form>
        <fieldset className="field-set-contact">
          <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-3 col-form-label">
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
            <label htmlFor="inputName" className="col-sm-3 col-form-label">
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
            <label htmlFor="inputPlate" className="col-sm-3 col-form-label">
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
            <label htmlFor="inputVehicle" className="col-sm-3 col-form-label">
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
                  <input className="form-check-input" type="checkbox" /> Yes
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4">Receive a Copy?</label>
            <div className="col-sm-8">
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" /> Yes
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
    );
  }
}

export default Form;
