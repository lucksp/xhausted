import React, { Component } from "react";

class ReportForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container flex center column report-form">
        <h3>We make it easy to report a vehicle</h3>
        <p>And we never save or share your information</p>
        <div className="">
          <form>
            <div class="form-group row">
              <label for="inputEmail" class="col-sm-2 col-form-label">
                Email
              </label>
              <div class="col-sm-10">
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputName" class="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <fieldset class="form-group row">
              <legend class="col-form-legend col-sm-2">Radios</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="option1"
                      checked
                    />
                    Option one is this and that&mdash;be sure to include why
                    it's great
                  </label>
                </div>
                <div class="form-check">
                  <label class="form-check-label">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="option2"
                    />
                    Option two can be something else and selecting it will
                    deselect option one
                  </label>
                </div>
                <div class="form-check disabled">
                  <label class="form-check-label">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios3"
                      value="option3"
                      disabled
                    />
                    Option three is disabled
                  </label>
                </div>
              </div>
            </fieldset>

            <div class="form-group row">
              <div class="offset-sm-2 col-sm-10">
                <button type="submit" class="btn btn-primary">
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReportForm;
